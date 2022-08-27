import { Box, ListItem, ListItemButton, Typography,IconButton} from '@mui/material'
import { useEffect, useState } from 'react'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import roomApi from '../../api/roomApi'
import { setRooms } from '../../redux/features/roomSlice'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const RoomList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const rooms = useSelector((state) => state.room.value)
  const [activeIndex, setActiveIndex] = useState(0)
  const { roomId } = useParams()

  useEffect(() => {
    const getRooms = async () => {
      try {
        const res = await roomApi.getAll()
        dispatch(setRooms(res))
      } catch (err) {
        alert(err)
      }
    }
    getRooms()
  }, [dispatch])

  useEffect(() => {
    const index = rooms.findIndex(e => e.id === roomId)
    setActiveIndex(index)
  }, [rooms, roomId])

  const addRoom = async () => {
    try {
      const res = await roomApi.create()
      const newList = [res, ...rooms]
      dispatch(setRooms(newList))
      navigate(`/rooms/${res.id}`)
    } catch (err) {
      alert(err)
    }
  }
  const onDragEnd = async ({ source, destination }) => {
    const newList = [...rooms]
    const [removed] = newList.splice(source.index, 1)
    newList.splice(destination.index, 0, removed)

    const activeItem = newList.findIndex(e => e.id === roomId)
    setActiveIndex(activeItem)

    dispatch(setRooms(newList))

    try {
      await roomApi.updateFavouritePosition({ boards: newList })
    } catch (err) {
      alert(err)
    }
  }

  return (
    <>
      <ListItem>
        <Box sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant='body2' fontWeight='700'>
              Meetings
            </Typography>
            <IconButton onClick={addRoom}>
              <AddBoxOutlinedIcon fontSize='small' />
            </IconButton>
        </Box>
      </ListItem>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable key={'list-board-droppable-key'} droppableId={'list-board-droppable'}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {
                rooms.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <ListItemButton
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        selected={index === activeIndex}
                        component={Link}
                        to={`/rooms/${item.id}`}
                        sx={{
                          pl: '20px',
                          cursor: snapshot.isDragging ? 'grab' : 'pointer!important'
                        }}
                      >
                        <Typography
                          variant='body2'
                          fontWeight='700'
                          sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                        >
                          {item.icon} {item.title}
                        </Typography>
                      </ListItemButton>
                    )}
                  </Draggable>
                ))
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default RoomList
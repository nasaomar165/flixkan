import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import roomApi from "../api/roomApi";
import EmojiPicker from "../components/common/EmojiPicker";
import { setRooms } from "../redux/features/roomSlice";

let timer;
const timeout = 500;

const Room = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState("");

  const rooms = useSelector((state) => state.room.value);
  const user = useSelector((state) => state.user.value);
  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await roomApi.getOne(roomId);
        setTitle(res.title);
        setDescription(res.description)
        setIcon(res.icon);
      } catch (err) {
        alert(err);
      }
    };
    getRoom();
  }, [roomId]);

  const onIconChange = async (newIcon) => {
    let temp = [...rooms];
    const index = temp.findIndex((e) => e.id === roomId);
    temp[index] = { ...temp[index], icon: newIcon };
    setIcon(newIcon);
    dispatch(setRooms(temp));
    try {
      await roomApi.update(roomId, { icon: newIcon });
    } catch (err) {
      alert(err);
    }
  };

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    let temp = [...rooms];
    const index = temp.findIndex((e) => e.id === roomId);
    temp[index] = { ...temp[index], title: newTitle };

    dispatch(setRooms(temp));

    timer = setTimeout(async () => {
      try {
        await roomApi.update(roomId, { title: newTitle });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };
  const updateDescription = async (e) => {
    clearTimeout(timer)
    const newDescription = e.target.value
    setDescription(newDescription)
    timer = setTimeout(async () => {
      try {
        await roomApi.update(roomId, { description: newDescription })
      } catch (err) {
        alert(err)
      }
    }, timeout);
  }
  const deleteRoom = async () => {
    try {
      await roomApi.delete(roomId);

      const newList = rooms.filter((e) => e.id !== roomId);
      if (newList.length === 0) {
        navigate("/rooms");
      } else {
        navigate(`/rooms/${newList[0].id}`);
      }
      dispatch(setRooms(newList));
    } catch (err) {
      alert(err);
    }
  };
  const startRoom = async () => {
    try {
      const res = await roomApi.getOne(roomId);
      const url= `https://flixmeet.flixon.repl.co/room/${res.link}&usr=${user.username}`
      window.open(url)
    } catch (err) {
      alert(err);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <IconButton variant="outlined" color="error" onClick={deleteRoom}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <Box>
          {/* emoji picker */}
          <EmojiPicker icon={icon} onChange={onIconChange} />
          <TextField
            value={title}
            onChange={updateTitle}
            placeholder="Untitled"
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-input": { padding: 0 },
              "& .MuiOutlinedInput-notchedOutline": { border: "unset " },
              "& .MuiOutlinedInput-root": {
                fontSize: "2rem",
                fontWeight: "700",
              },
            }}
          />
          <TextField
            value={description}
            onChange={updateDescription}
            placeholder='Add a description'
            variant='outlined'
            multiline
            fullWidth
            sx={{
              '& .MuiOutlinedInput-input': { padding: 0 },
              '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
              '& .MuiOutlinedInput-root': { fontSize: '0.8rem' }
            }}
          />
          <LoadingButton
            variant="outlined"
            color="success"
            onClick={startRoom}
          >
            Click here Start your Meating
          </LoadingButton>
        </Box>
      </Box>
    </>
  );
};

export default Room;

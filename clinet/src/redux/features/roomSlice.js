import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: [] }

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setRooms } = roomSlice.actions

export default roomSlice.reducer
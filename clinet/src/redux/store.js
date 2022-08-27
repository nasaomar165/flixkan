import { configureStore } from "@reduxjs/toolkit"
import userReducer from './features/userSlice'
import boardReducer from './features/boardSlice'
import roomReducer from './features/roomSlice'
import favouriteReducer from './features/favouriteSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    room: roomReducer,
    favourites: favouriteReducer
  }
})
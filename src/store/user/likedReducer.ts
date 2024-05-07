import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface likedFilmsState {
  liked: number[]
}

const initialState: likedFilmsState = {
  liked: []
}

export const likedSlice = createSlice({
  name: 'liked',
  initialState,
  reducers: {
    setLikedFilms(state, action: PayloadAction<likedFilmsState>) {
      state.liked = action.payload.liked
    },
  }
})

export const { setLikedFilms } = likedSlice.actions
export const likedReducer = likedSlice.reducer
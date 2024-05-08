import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface likedFilmsState {
  liked: number[]
}

const initialState: likedFilmsState = {
  liked: []
}

export const likedSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setLikedFilms(state, action: PayloadAction<any>) {
      state.liked = action.payload;
    },
  }
})

export const { setLikedFilms } = likedSlice.actions
export const likedReducer = likedSlice.reducer
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface likedFilmsState {
  liked: number[],
  likedGenres: string[]
}

const initialState: likedFilmsState = {
  liked: [],
  likedGenres: ['']
}

export const likedSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setLikedFilms(state, action: PayloadAction<any>) {
      state.liked = action.payload;
    },
    addFilmToLiked(state, action: PayloadAction<any>) {
      state.liked.push(Number(action.payload));
    },
    removeFilmFromLiked(state, action: PayloadAction<any>) {
      state.liked = state.liked.filter((movie) => movie != action.payload);
    },

    setLikedGenres(state, action: PayloadAction<any>) {
      state.likedGenres = action.payload;
    }
  }
})

export const { setLikedFilms, addFilmToLiked, removeFilmFromLiked, setLikedGenres } = likedSlice.actions
export const likedReducer = likedSlice.reducer
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { IFilmSingle } from '../../models/models';

export interface wishlistFilmsState {
  wish: number[],
  wishlistGenres: string[],
  wishlistFilms: IFilmSingle[],
}

const initialState: wishlistFilmsState = {
  wish: [],
  wishlistGenres: [''],
  wishlistFilms: [],
}

export const wishlistSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setWishlistFilmsIds(state, action: PayloadAction<any>) {
      state.wish = action.payload;
    },
    addFilmToWishlist(state, action: PayloadAction<any>) {
      state.wish.push(Number(action.payload));
    },
    removeFilmFromWishlist(state, action: PayloadAction<any>) {
      state.wish = state.wish.filter((movie) => movie != action.payload);
    },
    setWishlistFilmsData(state, action: PayloadAction<IFilmSingle[]>) {
      state.wishlistFilms = action.payload;
    }
  }
})

export const { setWishlistFilmsIds, addFilmToWishlist, removeFilmFromWishlist, setWishlistFilmsData } = wishlistSlice.actions
export const wishlistReducer = wishlistSlice.reducer
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface wishlistFilmsState {
  wish: number[],
  wishlistGenres: string[]
}

const initialState: wishlistFilmsState = {
  wish: [],
  wishlistGenres: ['']
}

export const wishlistSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setWishlistFilms(state, action: PayloadAction<any>) {
      state.wish = action.payload;
    },
    addFilmToWishlist(state, action: PayloadAction<any>) {
      state.wish.push(Number(action.payload));
    },
    removeFilmFromWishlist(state, action: PayloadAction<any>) {
      state.wish = state.wish.filter((movie) => movie != action.payload);
    }
  }
})

export const { setWishlistFilms, addFilmToWishlist, removeFilmFromWishlist } = wishlistSlice.actions
export const wishlistReducer = wishlistSlice.reducer
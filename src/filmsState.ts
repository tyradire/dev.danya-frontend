import { createSlice } from "@reduxjs/toolkit";

export const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    films: [],
    isLoading: false
  },
  reducers: {
    getFilmsFetch: (state) => {
      state.isLoading = true;
    },
    getFilmsSuccess: (state, action) => {
      state.films = action.payload;
      state.isLoading = false;
    },
    getFilmsFailure: (state) => {
      state.isLoading = false;
    }
  }
})

export const { getFilmsFetch, getFilmsSuccess, getFilmsFailure } = filmsSlice.actions;
export default filmsSlice.reducer;
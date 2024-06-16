import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface interfaceState {
  modalMessage: string,
  isOpened: boolean,
  status: string,
  theme: string
}

const initialState: interfaceState = {
  modalMessage: '',
  isOpened: false,
  status: '',
  theme: localStorage.getItem('app-theme') || 'default'
}

export const interfaceSlice = createSlice({
  name: 'interface',
  initialState,
  reducers: {
    setSuccessStatus(state, action: PayloadAction<any>) {
      state.modalMessage = 'Профиль создан!';
      state.isOpened = true;
      state.status = action.payload.status;
    },
    setUnauthorizedStatus(state, action: PayloadAction<any>) {
      state.modalMessage = 'Вы не авторизованы';
      state.isOpened = true;
      state.status = action.payload.status;
    },
    setDefaultStatus(state) {
      state.modalMessage = '';
      state.isOpened = false;
      state.status = '';
    },
    toogleTheme(state, action: PayloadAction<any>) {
      state.theme = action.payload;
    }
  }
})

export const { setSuccessStatus, setUnauthorizedStatus, setDefaultStatus, toogleTheme } = interfaceSlice.actions
export const interfaceReducer = interfaceSlice.reducer
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface interfaceState {
  modalMessage: string,
  isOpened: boolean,
  status: string,
}

const initialState: interfaceState = {
  modalMessage: '',
  isOpened: false,
  status: ''
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
    }
  }
})

export const { setSuccessStatus, setUnauthorizedStatus, setDefaultStatus } = interfaceSlice.actions
export const interfaceReducer = interfaceSlice.reducer
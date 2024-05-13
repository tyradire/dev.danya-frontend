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
  }
})

export const { setSuccessStatus } = interfaceSlice.actions
export const interfaceReducer = interfaceSlice.reducer
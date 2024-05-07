import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserState {
  id: number
  email: string
  name: string
  role: string
  isAuth: boolean
}

const initialState: UserState = {
  id: 0,
  email: '',
  name: 'Пользователь',
  role: 'USER',
  isAuth: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.isAuth = action.payload.isAuth;
    },
    logoutUser(state) {
      state = initialState;
    }
  }
})

export const { setUserData, logoutUser } = userSlice.actions
export const userReducer = userSlice.reducer
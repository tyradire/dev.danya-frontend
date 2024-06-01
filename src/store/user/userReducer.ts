import {createSlice, PayloadAction} from '@reduxjs/toolkit';
export interface UserState {
  id: number
  email: string
  name: string
  avatar: string
  role: string
  isAuth: boolean
}

const initialState: UserState = {
  id: 0,
  email: '',
  name: 'Пользователь',
  avatar: '',
  role: 'USER',
  isAuth: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<any>) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.isAuth = action.payload.isAuth;
    },
    logoutUser(state) {
      state = initialState;
    },
    renameUser(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    getAllUserData(state, action: PayloadAction<any>) {
      state.id = action.payload.data.user.id;
      state.email = action.payload.data.user.email;
      state.name = action.payload.data.user.name;
      state.avatar = action.payload.data.user.avatar;
      state.role = action.payload.data.user.role;
      state.isAuth = true;
    },
    setUserAvatar(state, action: PayloadAction<any>) {
      state.avatar = action.payload;
    }
  }
})

export const { setUserData, logoutUser, renameUser, getAllUserData, setUserAvatar } = userSlice.actions
export const userReducer = userSlice.reducer
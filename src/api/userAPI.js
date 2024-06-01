import axios from 'axios';
import { authHost, host } from './index';


export const registration = (email, password) => {
  return host.post(process.env.API_URL + '/api/user/registration', {email, password})
  .then(res => {
    localStorage.setItem('token', res.data.accessToken)
    return {result: res.data.token, success: true};
  })
  .catch(err => {
    return {result: err.response.data.message, success: false};
  })
}

export const login = async (email, password) => {
  return host.post(process.env.API_URL + '/api/user/login', {email, password})
  .then(res => {
    localStorage.setItem('token', res.data.accessToken)
    return {result: res.data.accessToken, success: true};
  })
  .catch(err => {
    console.log(err)
    return {result: err.response.data.message, success: false};
  })
}

export const logout = async (id) => {
  return authHost.post(process.env.API_URL + '/api/user/logout')
  .then(res => {  
    return res
  })
  .catch(err => {
    console.log('logout REJECT: ',err)
  })
}

export const rename = async (name) => {
  return authHost.put(process.env.API_URL + '/api/user/rename', { name: name })
}

export const getUserData = async () => {
  return authHost.get(process.env.API_URL + '/api/user/userdata')
}

export const submitUserAvatar = async (avatar) => {
  return authHost.put(process.env.API_URL + '/api/user/avatar', avatar, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
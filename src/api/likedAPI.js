import axios from 'axios';
import { authHost } from './index';

export const getLikedMovies = () => {
  return authHost.get(process.env.API_URL + `/api/liked/getcollection`)
}

export const addToLikedMovies = (id) => {
  return authHost.patch(process.env.API_URL + `/api/liked/add/${id}`)
  .then(res => {
    localStorage.setItem('token', res.data.accessToken)
    return res
  })
  .catch(err => {
    console.error(err)
  })
}

export const removeFromLikedMovies = (id) => {
  return authHost.patch(process.env.API_URL + `/api/liked/delete/${id}`)
  .then(res => {
    localStorage.setItem('token', res.data.accessToken)
    return res
  })
  .catch(err => {
    console.error(err)
  })
}
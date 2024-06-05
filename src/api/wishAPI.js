import axios from 'axios';
import { authHost } from './index';

export const getWishListMovies = () => {
  return authHost.get(process.env.API_URL + `/api/wish/getwishlist`)
}

export const addToWishMovie = (id) => {
  return authHost.patch(process.env.API_URL + `/api/wish/add/${id}`)
  .then(res => {
    localStorage.setItem('token', res.data.accessToken)
    return res
  })
  .catch(err => {
    console.error(err)
  })
}

export const removeFromWishMovie = (id) => {
  return authHost.patch(process.env.API_URL + `/api/wish/delete/${id}`)
  .then(res => {
    localStorage.setItem('token', res.data.accessToken)
    return res
  })
  .catch(err => {
    console.error(err)
  })
}
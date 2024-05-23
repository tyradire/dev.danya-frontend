import axios from 'axios';
import { authHost } from './index';

export const getCollectionMovies = () => {
  return authHost.get(process.env.API_URL + `/api/collection/getcollection`)
}

export const addToCollectionMovies = (id) => {
  return authHost.patch(process.env.API_URL + `/api/collection/add/${id}`)
  .then(res => {
    localStorage.setItem('token', res.data.accessToken)
    return res
  })
  .catch(err => {
    console.error(err)
  })
}

export const removeFromCollectionMovies = (id) => {
  return authHost.patch(process.env.API_URL + `/api/collection/delete/${id}`)
  .then(res => {
    localStorage.setItem('token', res.data.accessToken)
    return res
  })
  .catch(err => {
    console.error(err)
  })
}
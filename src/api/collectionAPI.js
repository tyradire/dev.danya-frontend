import axios from 'axios';
import { authHost } from './index';

export const getLikedMovies = () => {
  return authHost.get(process.env.API_URL + `/api/collection/getcollection`)
  .then(res => {
    return res.data.liked;
  })
  .catch(err => {
    console.error(err)
  })
}

export const addToLikedMovies = (id) => {
  return authHost.patch(process.env.API_URL + `/api/collection/add/${id}`)
  .then(res => {
    return res
  })
  .catch(err => {
    console.error(err)
  })
}

export const removeFromLikedMovies = (id) => {
  return authHost.patch(process.env.API_URL + `/api/collection/delete/${id}`)
  .then(res => {
    return res
  })
  .catch(err => {
    console.error(err)
  })
}
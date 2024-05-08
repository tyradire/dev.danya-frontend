import axios from 'axios';

export const getLikedMovies = (id) => {
  return axios.get(process.env.API_URL + `/api/collection/getcollection`, { params: {id: id}})
  .then(res => {
    return res.data.liked;
  })
  .catch(err => {
    console.error(err)
  })
}
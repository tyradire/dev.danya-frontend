import axios from 'axios';

export const getLikedMovies = (id) => {
  return axios.get(process.env.API_URL + `/api/collection/getcollection`, { params: {id: id}})
  .then(res => {
    console.log('res ',res)
  })
  .catch(err => {
    console.log('err ',err)
  })
}
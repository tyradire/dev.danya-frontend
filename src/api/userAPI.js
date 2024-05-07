import axios from 'axios';

export const registration = (email, password) => {
  return axios.post(process.env.API_URL + '/api/user/registration', {email, password})
  .then(res => {
    localStorage.setItem('token', res.data.token)
    return {result: res.data.token, success: true};
  })
  .catch(err => {
    return {result: err.response.data.message, success: false};
  })
}

export const login = async (email, password) => {
  return axios.post(process.env.API_URL + '/api/user/login', {email, password})
  .then(res => {
    //console.log(res)
    localStorage.setItem('token', res.data.token)
    return {result: res.data.token, success: true};
  })
  .catch(err => {
    console.log(err)
    return {result: err.response.data.message, success: false};
  })
}

// export const check = async () => {
//   const {data} = await $authHost.get('api/user/auth' )
//   localStorage.setItem('token', data.token)
//   //return jwt_decode(data.token)
// }
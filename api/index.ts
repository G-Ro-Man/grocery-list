import axios from 'axios'

const API_URL = 'http://localhost:3000'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.response.use(function (response) {
  return response
}, function (error) {
  console.log('error: ', error.response?.data)
  return Promise.reject(error)
})

export default $api
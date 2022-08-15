import axios from 'axios'

export const httpAxios = axios.create({
  baseURL: '',
  timeout: 5000,
  adapter: require('axios/lib/adapters/http.js'),
})

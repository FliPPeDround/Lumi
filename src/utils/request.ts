import axios from 'axios'

export const request = axios.create({
  baseURL: '',
  timeout: 5000,
})

request.defaults.adapter = await import('axios/lib/adapters/http.js')
export default request

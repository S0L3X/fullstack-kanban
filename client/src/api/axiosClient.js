import axios from 'axios'
import queryString from 'query-string'

// const baseUrl = 'http://127.0.0.1:5000/api/v1/'
const baseUrl = 'https://fullstack-kanban.vercel.app/api/v1/'
const getToken = () => localStorage.getItem('token')

const axiosClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: params => queryString.stringify({ params })
})

axiosClient.interceptors.request.use(async config => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${getToken()}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
  }
})

axiosClient.interceptors.response.use(response => {
  if (response && response.data) return response.data
  return response
}, err => {
  if (!err.response) {
    console.log(err)
    // return alert(err)
  }
  throw err.response
})

export default axiosClient
import axios from 'axios'

const AxiosInstance = axios.create({
  baseURL: process.env.AUTH0_API_URL,
  headers: {
    common: {
      Authorization: `Bearer ${process.env.AUTH0_API_TOKEN}`,
    },
  },
})

export default AxiosInstance

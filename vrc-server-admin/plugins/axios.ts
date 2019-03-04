import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl || "http://localhost:8080/"
})
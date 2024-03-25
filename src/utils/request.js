import axios from 'axios' // 引入axios

const BASE_URL = "http://localhost:8080"

const service = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
})

export default service
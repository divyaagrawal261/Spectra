import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
})

apiClient.interceptors.request.use((config) => {
  if (config.skipAuth) {
    return config
  }

  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default apiClient

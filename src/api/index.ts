import { Search } from './Search'
import createAxiosInstance from './createAxiosInstance'

export * as api from './api'

// New
export const axiosInstance = createAxiosInstance('https://api.themoviedb.org/3')

const ACCESS_TOKEN_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjI3ZGM3MWYzOTQxZGViNTY3NzQ1ZjE1ZmZhYmIyMCIsInN1YiI6IjY0Y2IxMzE0NzY0Yjk5MDBhZTExYTMyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D1-2CGtmDzoI-tKaGq6BBucl1XE5nqcTwdYARw3KPWQ'

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${ACCESS_TOKEN_KEY}`
  config.headers['Content-Type'] = 'application/json'
  return config
})

const search = new Search()

export const Api = { search }

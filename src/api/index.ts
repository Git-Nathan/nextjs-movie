import { Media } from './Media'
import { Search } from './Search'
import { Similar } from './Similar'
import { Trailer } from './Trailer'
import { Trending } from './Trending'
import { UpComing } from './UpComing'
import createAxiosInstance from './config/createAxiosInstance'

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
const media = new Media()
const trending = new Trending()
const upComing = new UpComing()
const similar = new Similar()
const trailer = new Trailer()

export const Api = { search, media, trending, upComing, similar, trailer }

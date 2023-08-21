import { AxiosResponse } from 'axios'
import { lastValueFrom, map } from 'rxjs'
import { axiosInstance } from '.'

export class Trending {
  getTrendingAll(locale: string) {
    return lastValueFrom(
      axiosInstance.get('/trending/all/week', { language: locale }).pipe(
        map((response) => {
          const { data } = response as AxiosResponse
          return data.results.slice(0, 5)
        }),
      ),
    )
  }

  getTrendingMovie(locale: string) {
    return lastValueFrom(
      axiosInstance.get('/trending/movie/week', { language: locale }).pipe(
        map((response) => {
          const { data } = response as AxiosResponse
          return data.results.slice(0, 5)
        }),
      ),
    )
  }

  getTrendingTVShow(locale: string) {
    return lastValueFrom(
      axiosInstance.get('/trending/tv/week', { language: locale }).pipe(
        map((response) => {
          const { data } = response as AxiosResponse
          return data.results.slice(0, 5)
        }),
      ),
    )
  }
}

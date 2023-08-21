import { IFilm } from '@/interfaces'
import { AxiosResponse } from 'axios'
import { lastValueFrom, map } from 'rxjs'
import { axiosInstance } from '.'

export class Search {
  getMulti(search_query: string, locale: string) {
    const response = axiosInstance
      .get('/search/multi', {
        query: search_query,
        language: locale,
      })
      .pipe(
        map((data) => {
          const axiosResponse: AxiosResponse = data as AxiosResponse
          return {
            ...axiosResponse.data,
            results: axiosResponse.data.results as IFilm[],
          }
        }),
      )
    return lastValueFrom(response)
  }
}

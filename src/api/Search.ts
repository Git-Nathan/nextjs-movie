import { IMedia } from '@/interfaces'
import { AxiosResponse } from 'axios'
import { lastValueFrom, map } from 'rxjs'
import { axiosInstance } from '.'

export class Search {
  getMulti(search_query: string, locale: string) {
    return lastValueFrom(
      axiosInstance
        .get('/search/multi', {
          query: search_query,
          language: locale,
        })
        .pipe(
          map((response) => {
            const { data } = response as AxiosResponse
            return {
              ...data,
              results: data.results as IMedia[],
            }
          }),
        ),
    )
  }
}

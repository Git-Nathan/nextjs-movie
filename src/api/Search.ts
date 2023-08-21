import { IMedia } from '@/interfaces'
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
        .pipe(map((response) => response.data?.results as IMedia[])),
    )
  }
}

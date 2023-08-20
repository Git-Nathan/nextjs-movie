import { axiosInstance } from '.'

export interface IFilm {
  id: number
  title: string
  backdrop_path: string
  poster_path: string
  overview: string
  release_date: string
  media_type: string
}

export class Search {
  getMulti(search_query: string, locale: string) {
    const response = axiosInstance.get('/search/multi', {
      query: search_query,
      language: locale,
    })
    response.subscribe({
      next(results) {
        return results
      },
    })
  }
}

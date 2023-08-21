import { IGenres } from '@/interface'
import { IMedia } from '@/interfaces'
import { lastValueFrom, map } from 'rxjs'
import { axiosInstance } from '.'

export class Media {
  getById(id: string, locale: string, media: string) {
    return lastValueFrom(
      axiosInstance
        .get(`/${media}/${id}`, {
          language: locale,
        })
        .pipe(
          map((response) => {
            const { data } = response
            return {
              ...data,
              genres: data.genres.map((item: IGenres) => item.name).join(', '),
            }
          }),
        ),
    )
  }

  getSimilal(id: string, locale: string, media: string) {
    return lastValueFrom(
      axiosInstance
        .get(`/${media}/${id}/similar`, {
          language: locale,
        })
        .pipe(
          map((response) => {
            const { data } = response
            return {
              ...data,
              results: data.results as IMedia[],
            }
          }),
        ),
    )
  }
}

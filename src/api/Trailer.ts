import { AxiosResponse } from 'axios'
import { filter, find, lastValueFrom, map } from 'rxjs'
import { axiosInstance } from '.'

export class Trailer {
  getTrailer(id: number, type: string) {
    return lastValueFrom(
      axiosInstance.get(`/${type}/${id}/videos`).pipe(
        map((response) => {
          const keyVideos = response.data?.results as any[]
          return keyVideos?.find(
            (item: any) =>
              item.type === 'Teaser' ||
              item.type === 'Trailer' ||
              item.type === 'Opening Credits',
          )
        }),
      ),
    )
  }
}

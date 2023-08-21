import { AxiosResponse } from 'axios'
import { lastValueFrom, map } from 'rxjs'
import { axiosInstance } from '.'

export class UpComing {
  getUpComing(locale: string) {
    return lastValueFrom(
      axiosInstance
        .get('/movie/upcoming', {
          language: locale,
        })
        .pipe(map((response) => response.data?.results)),
    )
  }
}

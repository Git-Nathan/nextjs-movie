import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Observable } from 'rxjs'

export class AxiosObservable {
  private config?: AxiosRequestConfig
  private axios: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    if (config) {
      this.config = config
    }

    this.axios = axios.create(this.config)
  }

  static create(config?: AxiosRequestConfig) {
    return new AxiosObservable(config)
  }

  get interceptors() {
    return this.axios.interceptors
  }

  request(config: AxiosRequestConfig) {
    return new Observable<AxiosResponse<any>>((subscribe) => {
      this.axios
        .request({ ...config })
        .then((response) => {
          subscribe.next(response)
          subscribe.complete()
        })
        .catch((error) => {
          subscribe.error(error)
        })
    })
  }

  get(url: string, params?: any, config?: AxiosRequestConfig) {
    return this.request({
      url,
      method: 'GET',
      params,
      ...config,
    })
  }

  delete(url: string, params?: any, config?: AxiosRequestConfig) {
    return this.request({
      url,
      method: 'DELETE',
      params,
      ...config,
    })
  }

  post(url: string, data: { [key: string]: any }, config?: AxiosRequestConfig) {
    return this.request({
      url,
      data,
      method: 'POST',
      ...config,
    })
  }

  put(url: string, data: { [key: string]: any }, config?: AxiosRequestConfig) {
    return this.request({
      url,
      data,
      method: 'PUT',
      ...config,
    })
  }

  patch(
    url: string,
    data: { [key: string]: any },
    config?: AxiosRequestConfig,
  ) {
    return this.request({
      url,
      data,
      method: 'PATCH',
      ...config,
    })
  }
}

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
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

  get interceptors() {
    return this.axios.interceptors
  }

  static create(config?: AxiosRequestConfig) {
    return new AxiosObservable(config)
  }

  request(config: AxiosRequestConfig) {
    return new Observable((subscribe) => {
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

import { Service } from 'fastify-decorators';
import { httpClient as axiosClient } from './http.communication';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IHttpClient {
  get<T>(url: string, params: Record<string, any>): Promise<AxiosResponse<T>>;
  patch<T, D = void>(url: string, data: D): Promise<AxiosResponse<T>>;
  put<T, D = void>(url: string, data: D): Promise<AxiosResponse<T>>;
}

@Service()
export default class HttpClient implements IHttpClient {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axiosClient;
  }

  async get<T>(
    url: string,
    params?: Record<string, any>,
    headers?: Record<string, any>,
    config?: AxiosRequestConfig,
  ) {
    return await this.httpClient.get<T>(url, { params, headers, ...config });
  }

  async patch<T, D = void>(url: string, data?: D, config?: AxiosRequestConfig) {
    return await this.httpClient.patch<T>(url, data, config);
  }

  async put<T, D = void>(url: string, data?: D, config?: AxiosRequestConfig) {
    return await this.httpClient.put<T>(url, data, config);
  }

  async post<R, D = void>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<R>> {
    return await this.httpClient.post<R>(url, data, config);
  }
}

import { AxiosResponse } from 'axios';

export const createFakeAxiosResponse = <T>(data: T): Partial<AxiosResponse> => {
  return { data: data, status: 200, statusText: 'OK' };
};

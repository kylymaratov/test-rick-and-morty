import axios, { Method } from 'axios';
import { BASE_URL } from './base-url';

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(
  (request) => {
    request.data = JSON.stringify(request.data);

    request.headers.set('Content-Type', 'application/json');

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const httpRequest = async <T>(
  url: string,
  method: Method = 'GET',
  data: any = {},
  headers: any = {}
) => {
  return (await api<T>({ url, method, data, headers })).data;
};

export default httpRequest;

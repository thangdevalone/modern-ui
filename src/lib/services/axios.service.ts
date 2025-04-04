import axios, {AxiosError, AxiosResponse} from 'axios';
import {APP_CONFIG} from '@/configs/app.config';

const normalizeBaseUrl = (url?: string) => {
  if (!url) return '';
  return url.endsWith('/') ? url.slice(0, -1) : url;
};
const axiosService = axios.create({
  baseURL: `${normalizeBaseUrl(APP_CONFIG.apiUrl)}`,
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosService.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosService.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    return response;
  },
  (error: AxiosError<{ data: any }>) => {
    return Promise.reject(error.response?.data);
  },
);

export default axiosService;
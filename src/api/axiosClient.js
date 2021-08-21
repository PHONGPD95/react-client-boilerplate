import axios from 'axios';
import qs from 'qs';

import config from '~constants/config';
import storage from '~constants/storage';
import { clearStorage, readStorage } from '~utils/handleStorage';
import authApi from './authApi';

const axiosClient = axios.create({
  baseURL: config.SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => qs.stringify(params),
});

axiosClient.interceptors.request.use((request) => {
  const { accessToken } = readStorage(storage.AUTH) || {};
  if (accessToken) request.headers.Authorization = `Bearer ${accessToken}`;

  return request;
});

axiosClient.interceptors.response.use(
  (response) => {
    const { data } = response?.data || {};
    if (data) return data;

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url === `${config.SERVER_URL}/auth/refresh-token`) {
      clearStorage();
      return Promise.reject(error);
    }

    if (
      (!originalRequest._retry && error.response?.status === 403) ||
      (!error.response && window.location.pathname !== '/auth/sign-in')
    ) {
      originalRequest._retry = true;

      const accessToken = await authApi.getRefreshToken();
      if (accessToken) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axios(originalRequest);
      }

      clearStorage();
    }

    // return Error object with Promise
    return Promise.reject(error);
  }
);

export default axiosClient;

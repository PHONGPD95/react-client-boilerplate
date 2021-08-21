import axiosClient from './axiosClient';

import config from '~constants/config';
import message from '~constants/message';

class API {
  async call(action = 'get', path = '', params = {}) {
    try {
      const url = `${config.SERVER_URL}/${path}`;

      switch (action) {
        case 'post':
          return axiosClient.post(url, params);

        case 'put':
          return axiosClient.put(url, params);

        case 'delete':
          return axiosClient.delete(url, params);

        default:
          return axiosClient.get(url, params);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error ?? message.PROCESS_ERROR;

      throw new Error(errorMessage);
    }
  }
}

const api = new API();

export default api;

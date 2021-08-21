import api from '~api/index';
import storage from '~constants/storage';

import { readStorage, removeStorage, writeStorage } from '~utils/handleStorage';

const authApi = {
  signUp: async (params) => {
    const res = await api.call('post', 'auth/sign-up', params);

    return res;
  },
  signIn: async (params) => {
    const { user, accessToken, refreshToken } = await api.call('post', 'auth/sign-in', params);

    writeStorage(storage.AUTH)({ accessToken, refreshToken });

    return user;
  },
  signOut: async () => {
    const res = await api.call('post', 'auth/sign-out');

    removeStorage(storage.AUTH);

    return res;
  },
  getMe: async () => {
    const res = await api.call('get', 'auth/me');

    return res;
  },
  getRefreshToken: async () => {
    const { refreshToken } = readStorage(storage.AUTH) || {};

    const { accessToken } = await api.call('post', 'auth/refresh-token', {
      refreshToken: refreshToken,
    });

    writeStorage(storage.AUTH)({ accessToken, refreshToken });

    return accessToken;
  },
};

export default authApi;

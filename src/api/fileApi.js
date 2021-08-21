import api from '~api/index';

const fileApi = {
  getAll: async () => {
    const res = await api.call('get', 'file');

    return res;
  },
  upload: async (files) => {
    const formData = new FormData();

    for (const file of files) {
      formData.append('file', file);
    }

    const res = await api.call('post', 'file/upload', formData);

    return res;
  },
  delete: async (id) => {
    const res = await api.call('delete', `file/${id}`);

    return res;
  },
};

export default fileApi;

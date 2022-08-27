import axiosClient from './axiosClient'

const roomApi = {
  create: () => axiosClient.post('rooms'),
  getAll: () => axiosClient.get('rooms'),
  updatePositoin: (params) => axiosClient.put('rooms', params),
  getOne: (id) => axiosClient.get(`rooms/${id}`),
  delete: (id) => axiosClient.delete(`rooms/${id}`),
  update: (id, params) => axiosClient.put(`rooms/${id}`, params),
}

export default roomApi
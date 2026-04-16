import api from './client';
import { ApiResponse, Place, PlaceQuery } from '../../types';

export const placesApi = {
  getAll: async (query?: PlaceQuery) => {
    const res = await api.get<ApiResponse<Place[]>>('/places', { params: query });
    return res.data;
  },

  getById: async (id: string) => {
    const res = await api.get<ApiResponse<Place>>(`/places/${id}`);
    return res.data.data!;
  },

  getBestView: async () => {
    const res = await api.get<ApiResponse<Place[]>>('/places/best-view');
    return res.data.data!;
  },

  getRecommended: async () => {
    const res = await api.get<ApiResponse<Place[]>>('/places/recommended');
    return res.data.data!;
  },

  create: async (data: Partial<Place>) => {
    const res = await api.post<ApiResponse<Place>>('/places', data);
    return res.data.data!;
  },

  update: async (id: string, data: Partial<Place>) => {
    const res = await api.put<ApiResponse<Place>>(`/places/${id}`, data);
    return res.data.data!;
  },

  delete: async (id: string) => {
    await api.delete(`/places/${id}`);
  },
};

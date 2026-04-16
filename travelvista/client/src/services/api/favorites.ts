import api from './client';
import { ApiResponse, Favorite } from '../../types';

export const favoritesApi = {
  getAll: async () => {
    const res = await api.get<ApiResponse<Favorite[]>>('/favorites');
    return res.data.data!;
  },

  check: async (placeId: string) => {
    const res = await api.get<ApiResponse<{ isFavorited: boolean }>>(`/favorites/${placeId}/check`);
    return res.data.data!.isFavorited;
  },

  add: async (placeId: string) => {
    const res = await api.post<ApiResponse>(`/favorites/${placeId}`);
    return res.data;
  },

  remove: async (placeId: string) => {
    const res = await api.delete<ApiResponse>(`/favorites/${placeId}`);
    return res.data;
  },
};

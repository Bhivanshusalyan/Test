import api from './client';
import { ApiResponse, Review } from '../../types';

export const reviewsApi = {
  getByPlace: async (placeId: string) => {
    const res = await api.get<ApiResponse<Review[]>>(`/places/${placeId}/reviews`);
    return res.data.data!;
  },

  create: async (placeId: string, data: { comment: string; rating: number }) => {
    const res = await api.post<ApiResponse<Review>>(`/places/${placeId}/reviews`, data);
    return res.data.data!;
  },

  update: async (id: string, data: { comment?: string; rating?: number }) => {
    const res = await api.put<ApiResponse<Review>>(`/reviews/${id}`, data);
    return res.data.data!;
  },

  delete: async (id: string) => {
    await api.delete(`/reviews/${id}`);
  },
};

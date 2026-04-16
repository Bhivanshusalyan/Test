import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsApi } from '../services/api/reviews';

export function useReviews(placeId: string) {
  return useQuery({
    queryKey: ['reviews', placeId],
    queryFn: () => reviewsApi.getByPlace(placeId),
    enabled: !!placeId,
  });
}

export function useCreateReview(placeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { comment: string; rating: number }) =>
      reviewsApi.create(placeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', placeId] });
      queryClient.invalidateQueries({ queryKey: ['place', placeId] });
      queryClient.invalidateQueries({ queryKey: ['places'] });
    },
  });
}

export function useDeleteReview(placeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: string) => reviewsApi.delete(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', placeId] });
      queryClient.invalidateQueries({ queryKey: ['place', placeId] });
      queryClient.invalidateQueries({ queryKey: ['places'] });
    },
  });
}

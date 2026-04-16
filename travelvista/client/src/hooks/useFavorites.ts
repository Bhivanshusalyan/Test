import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { favoritesApi } from '../services/api/favorites';
import { useAuth } from '../context/AuthContext';

export function useFavorites() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['favorites'],
    queryFn: () => favoritesApi.getAll(),
    enabled: isAuthenticated,
  });
}

export function useCheckFavorite(placeId: string) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['favorite', placeId],
    queryFn: () => favoritesApi.check(placeId),
    enabled: isAuthenticated && !!placeId,
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ placeId, isFavorited }: { placeId: string; isFavorited: boolean }) => {
      if (isFavorited) {
        await favoritesApi.remove(placeId);
      } else {
        await favoritesApi.add(placeId);
      }
    },
    onSuccess: (_, { placeId }) => {
      queryClient.invalidateQueries({ queryKey: ['favorite', placeId] });
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
}

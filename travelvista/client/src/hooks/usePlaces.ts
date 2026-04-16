import { useQuery } from '@tanstack/react-query';
import { placesApi } from '../services/api/places';
import { PlaceQuery } from '../types';

export function usePlaces(query?: PlaceQuery) {
  return useQuery({
    queryKey: ['places', query],
    queryFn: () => placesApi.getAll(query),
  });
}

export function usePlace(id: string) {
  return useQuery({
    queryKey: ['place', id],
    queryFn: () => placesApi.getById(id),
    enabled: !!id,
  });
}

export function useBestViewPlaces() {
  return useQuery({
    queryKey: ['places', 'best-view'],
    queryFn: () => placesApi.getBestView(),
  });
}

export function useRecommendedPlaces() {
  return useQuery({
    queryKey: ['places', 'recommended'],
    queryFn: () => placesApi.getRecommended(),
  });
}

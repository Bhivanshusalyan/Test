import { z } from 'zod';

export const createPlaceSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().min(10).max(5000),
  city: z.string().min(1).max(100),
  country: z.string().min(1).max(100),
  category: z.enum(['Tourist Spot', 'Restaurant', 'Hotel']),
  images: z.array(z.string().url()).default([]),
  tags: z.array(z.string()).default([]),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const updatePlaceSchema = createPlaceSchema.partial();

export const queryPlaceSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  tags: z.string().optional(), // comma-separated
  minRating: z.string().optional(),
  sortBy: z.enum(['rating', 'name', 'created_at']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

export type CreatePlaceInput = z.infer<typeof createPlaceSchema>;
export type UpdatePlaceInput = z.infer<typeof updatePlaceSchema>;
export type QueryPlaceInput = z.infer<typeof queryPlaceSchema>;

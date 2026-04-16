import { z } from 'zod';

export const createReviewSchema = z.object({
  comment: z.string().min(3, 'Comment must be at least 3 characters').max(2000),
  rating: z.number().int().min(1).max(5),
});

export const updateReviewSchema = z.object({
  comment: z.string().min(3).max(2000).optional(),
  rating: z.number().int().min(1).max(5).optional(),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;

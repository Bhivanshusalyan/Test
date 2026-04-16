import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import db from '../database';
import { AuthRequest, Review } from '../types';
import { AppError } from '../middleware/error.middleware';

function recalculatePlaceRating(placeId: string): void {
  const result = db.prepare(
    'SELECT AVG(rating) as avg_rating FROM reviews WHERE place_id = ?'
  ).get(placeId) as any;

  const avgRating = result.avg_rating ? Math.round(result.avg_rating * 10) / 10 : 0;

  db.prepare('UPDATE places SET rating = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(avgRating, placeId);
}

export function getReviews(req: Request, res: Response): void {
  const { placeId } = req.params;

  // Verify place exists
  const place = db.prepare('SELECT id FROM places WHERE id = ?').get(placeId);
  if (!place) {
    throw new AppError('Place not found', 404);
  }

  const reviews = db.prepare(`
    SELECT r.*, u.name as user_name 
    FROM reviews r 
    JOIN users u ON r.user_id = u.id 
    WHERE r.place_id = ? 
    ORDER BY r.created_at DESC
  `).all(placeId);

  res.json({
    success: true,
    data: reviews,
  });
}

export function createReview(req: AuthRequest, res: Response): void {
  const { placeId } = req.params;
  const { comment, rating } = req.body;
  const userId = req.user!.id;

  // Verify place exists
  const place = db.prepare('SELECT id FROM places WHERE id = ?').get(placeId);
  if (!place) {
    throw new AppError('Place not found', 404);
  }

  // Check if user already reviewed
  const existing = db.prepare(
    'SELECT id FROM reviews WHERE user_id = ? AND place_id = ?'
  ).get(userId, placeId);
  if (existing) {
    throw new AppError('You have already reviewed this place', 409);
  }

  const id = uuid();

  db.prepare(`
    INSERT INTO reviews (id, comment, rating, user_id, place_id)
    VALUES (?, ?, ?, ?, ?)
  `).run(id, comment, rating, userId, placeId);

  // Recalculate average rating
  recalculatePlaceRating(placeId);

  const review = db.prepare(`
    SELECT r.*, u.name as user_name 
    FROM reviews r 
    JOIN users u ON r.user_id = u.id 
    WHERE r.id = ?
  `).get(id);

  res.status(201).json({
    success: true,
    data: review,
  });
}

export function updateReview(req: AuthRequest, res: Response): void {
  const { id } = req.params;
  const userId = req.user!.id;

  const existing = db.prepare('SELECT * FROM reviews WHERE id = ?').get(id) as Review | undefined;
  if (!existing) {
    throw new AppError('Review not found', 404);
  }

  if (existing.user_id !== userId && req.user!.role !== 'admin') {
    throw new AppError('Not authorized to update this review', 403);
  }

  const { comment = existing.comment, rating = existing.rating } = req.body;

  db.prepare(`
    UPDATE reviews SET comment = ?, rating = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).run(comment, rating, id);

  recalculatePlaceRating(existing.place_id);

  const updated = db.prepare(`
    SELECT r.*, u.name as user_name 
    FROM reviews r 
    JOIN users u ON r.user_id = u.id 
    WHERE r.id = ?
  `).get(id);

  res.json({
    success: true,
    data: updated,
  });
}

export function deleteReview(req: AuthRequest, res: Response): void {
  const { id } = req.params;
  const userId = req.user!.id;

  const existing = db.prepare('SELECT * FROM reviews WHERE id = ?').get(id) as Review | undefined;
  if (!existing) {
    throw new AppError('Review not found', 404);
  }

  if (existing.user_id !== userId && req.user!.role !== 'admin') {
    throw new AppError('Not authorized to delete this review', 403);
  }

  db.prepare('DELETE FROM reviews WHERE id = ?').run(id);
  recalculatePlaceRating(existing.place_id);

  res.json({
    success: true,
    message: 'Review deleted successfully',
  });
}

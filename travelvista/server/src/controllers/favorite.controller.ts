import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import db from '../database';
import { AuthRequest } from '../types';
import { AppError } from '../middleware/error.middleware';

export function getFavorites(req: AuthRequest, res: Response): void {
  const userId = req.user!.id;

  const favorites = db.prepare(`
    SELECT f.id as favorite_id, f.created_at as favorited_at, p.* 
    FROM favorites f 
    JOIN places p ON f.place_id = p.id 
    WHERE f.user_id = ?
    ORDER BY f.created_at DESC
  `).all(userId);

  const parsed = favorites.map((f: any) => ({
    ...f,
    images: JSON.parse(f.images),
    tags: JSON.parse(f.tags),
  }));

  res.json({
    success: true,
    data: parsed,
  });
}

export function addFavorite(req: AuthRequest, res: Response): void {
  const { placeId } = req.params;
  const userId = req.user!.id;

  // Verify place exists
  const place = db.prepare('SELECT id FROM places WHERE id = ?').get(placeId);
  if (!place) {
    throw new AppError('Place not found', 404);
  }

  // Check if already favorited
  const existing = db.prepare(
    'SELECT id FROM favorites WHERE user_id = ? AND place_id = ?'
  ).get(userId, placeId);
  if (existing) {
    throw new AppError('Place already in favorites', 409);
  }

  const id = uuid();
  db.prepare('INSERT INTO favorites (id, user_id, place_id) VALUES (?, ?, ?)').run(id, userId, placeId);

  res.status(201).json({
    success: true,
    message: 'Added to favorites',
    data: { id, placeId },
  });
}

export function removeFavorite(req: AuthRequest, res: Response): void {
  const { placeId } = req.params;
  const userId = req.user!.id;

  const existing = db.prepare(
    'SELECT id FROM favorites WHERE user_id = ? AND place_id = ?'
  ).get(userId, placeId);

  if (!existing) {
    throw new AppError('Favorite not found', 404);
  }

  db.prepare('DELETE FROM favorites WHERE user_id = ? AND place_id = ?').run(userId, placeId);

  res.json({
    success: true,
    message: 'Removed from favorites',
  });
}

export function checkFavorite(req: AuthRequest, res: Response): void {
  const { placeId } = req.params;
  const userId = req.user!.id;

  const existing = db.prepare(
    'SELECT id FROM favorites WHERE user_id = ? AND place_id = ?'
  ).get(userId, placeId);

  res.json({
    success: true,
    data: { isFavorited: !!existing },
  });
}

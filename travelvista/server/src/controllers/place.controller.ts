import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import db from '../database';
import { AuthRequest, Place } from '../types';
import { AppError } from '../middleware/error.middleware';

export function getPlaces(req: Request, res: Response): void {
  const {
    search,
    category,
    tags,
    minRating,
    sortBy = 'created_at',
    order = 'desc',
    page = '1',
    limit = '12',
  } = req.query as any;

  let query = 'SELECT * FROM places WHERE 1=1';
  let countQuery = 'SELECT COUNT(*) as total FROM places WHERE 1=1';
  const params: any[] = [];
  const countParams: any[] = [];

  if (search) {
    const clause = ' AND (name LIKE ? OR description LIKE ? OR city LIKE ? OR country LIKE ?)';
    const searchParam = `%${search}%`;
    query += clause;
    countQuery += clause;
    params.push(searchParam, searchParam, searchParam, searchParam);
    countParams.push(searchParam, searchParam, searchParam, searchParam);
  }

  if (category) {
    query += ' AND category = ?';
    countQuery += ' AND category = ?';
    params.push(category);
    countParams.push(category);
  }

  if (tags) {
    const tagList = (tags as string).split(',').map((t: string) => t.trim());
    tagList.forEach((tag: string) => {
      query += ' AND tags LIKE ?';
      countQuery += ' AND tags LIKE ?';
      params.push(`%"${tag}"%`);
      countParams.push(`%"${tag}"%`);
    });
  }

  if (minRating) {
    query += ' AND rating >= ?';
    countQuery += ' AND rating >= ?';
    params.push(parseFloat(minRating as string));
    countParams.push(parseFloat(minRating as string));
  }

  // Count total
  const totalResult = db.prepare(countQuery).get(...countParams) as any;
  const total = totalResult.total;

  // Sorting
  const validSortFields = ['rating', 'name', 'created_at'];
  const sortField = validSortFields.includes(sortBy as string) ? sortBy : 'created_at';
  const sortOrder = order === 'asc' ? 'ASC' : 'DESC';
  query += ` ORDER BY ${sortField} ${sortOrder}`;

  // Pagination
  const pageNum = Math.max(1, parseInt(page as string) || 1);
  const limitNum = Math.min(50, Math.max(1, parseInt(limit as string) || 12));
  const offset = (pageNum - 1) * limitNum;
  query += ' LIMIT ? OFFSET ?';
  params.push(limitNum, offset);

  const places = db.prepare(query).all(...params) as Place[];

  // Parse JSON fields
  const parsedPlaces = places.map(p => ({
    ...p,
    images: JSON.parse(p.images),
    tags: JSON.parse(p.tags),
  }));

  res.json({
    success: true,
    data: parsedPlaces,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  });
}

export function getPlaceById(req: Request, res: Response): void {
  const { id } = req.params;

  const place = db.prepare('SELECT * FROM places WHERE id = ?').get(id) as Place | undefined;
  if (!place) {
    throw new AppError('Place not found', 404);
  }

  // Get reviews with user info
  const reviews = db.prepare(`
    SELECT r.*, u.name as user_name 
    FROM reviews r 
    JOIN users u ON r.user_id = u.id 
    WHERE r.place_id = ? 
    ORDER BY r.created_at DESC
  `).all(id);

  res.json({
    success: true,
    data: {
      ...place,
      images: JSON.parse(place.images),
      tags: JSON.parse(place.tags),
      reviews,
    },
  });
}

export function getBestViewPlaces(_req: Request, res: Response): void {
  const places = db.prepare(
    "SELECT * FROM places WHERE tags LIKE '%\"Best View\"%' ORDER BY rating DESC"
  ).all() as Place[];

  const parsedPlaces = places.map(p => ({
    ...p,
    images: JSON.parse(p.images),
    tags: JSON.parse(p.tags),
  }));

  res.json({
    success: true,
    data: parsedPlaces,
  });
}

export function getRecommendedPlaces(req: Request, res: Response): void {
  // Rule-based recommendations: top rated places across categories
  const places = db.prepare(
    'SELECT * FROM places ORDER BY rating DESC LIMIT 8'
  ).all() as Place[];

  const parsedPlaces = places.map(p => ({
    ...p,
    images: JSON.parse(p.images),
    tags: JSON.parse(p.tags),
  }));

  res.json({
    success: true,
    data: parsedPlaces,
  });
}

export function createPlace(req: AuthRequest, res: Response): void {
  const { name, description, city, country, category, images, tags, latitude, longitude } = req.body;
  const id = uuid();

  db.prepare(`
    INSERT INTO places (id, name, description, city, country, category, images, tags, latitude, longitude)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, name, description, city, country, category, JSON.stringify(images || []), JSON.stringify(tags || []), latitude, longitude);

  const place = db.prepare('SELECT * FROM places WHERE id = ?').get(id) as Place;

  res.status(201).json({
    success: true,
    data: {
      ...place,
      images: JSON.parse(place.images),
      tags: JSON.parse(place.tags),
    },
  });
}

export function updatePlace(req: AuthRequest, res: Response): void {
  const { id } = req.params;

  const existing = db.prepare('SELECT * FROM places WHERE id = ?').get(id) as Place | undefined;
  if (!existing) {
    throw new AppError('Place not found', 404);
  }

  const {
    name = existing.name,
    description = existing.description,
    city = existing.city,
    country = existing.country,
    category = existing.category,
    images,
    tags,
    latitude = existing.latitude,
    longitude = existing.longitude,
  } = req.body;

  db.prepare(`
    UPDATE places 
    SET name = ?, description = ?, city = ?, country = ?, category = ?, 
        images = ?, tags = ?, latitude = ?, longitude = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    name, description, city, country, category,
    JSON.stringify(images || JSON.parse(existing.images)),
    JSON.stringify(tags || JSON.parse(existing.tags)),
    latitude, longitude, id
  );

  const updated = db.prepare('SELECT * FROM places WHERE id = ?').get(id) as Place;

  res.json({
    success: true,
    data: {
      ...updated,
      images: JSON.parse(updated.images),
      tags: JSON.parse(updated.tags),
    },
  });
}

export function deletePlace(req: AuthRequest, res: Response): void {
  const { id } = req.params;

  const existing = db.prepare('SELECT id FROM places WHERE id = ?').get(id);
  if (!existing) {
    throw new AppError('Place not found', 404);
  }

  db.prepare('DELETE FROM places WHERE id = ?').run(id);

  res.json({
    success: true,
    message: 'Place deleted successfully',
  });
}

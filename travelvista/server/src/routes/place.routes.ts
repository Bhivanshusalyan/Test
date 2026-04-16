import { Router } from 'express';
import {
  getPlaces,
  getPlaceById,
  getBestViewPlaces,
  getRecommendedPlaces,
  createPlace,
  updatePlace,
  deletePlace,
} from '../controllers/place.controller';
import { authenticate, requireAdmin } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createPlaceSchema, updatePlaceSchema } from '../schemas/place.schema';

const router = Router();

// Public routes
router.get('/best-view', getBestViewPlaces);
router.get('/recommended', getRecommendedPlaces);
router.get('/', getPlaces);
router.get('/:id', getPlaceById);

// Admin routes
router.post('/', authenticate, requireAdmin, validate(createPlaceSchema), createPlace);
router.put('/:id', authenticate, requireAdmin, validate(updatePlaceSchema), updatePlace);
router.delete('/:id', authenticate, requireAdmin, deletePlace);

export default router;

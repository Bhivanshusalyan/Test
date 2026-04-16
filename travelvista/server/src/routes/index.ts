import { Router } from 'express';
import authRoutes from './auth.routes';
import placeRoutes from './place.routes';
import reviewRoutes from './review.routes';
import favoriteRoutes from './favorite.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/places', placeRoutes);
router.use('/', reviewRoutes); // /api/places/:placeId/reviews and /api/reviews/:id
router.use('/favorites', favoriteRoutes);

// Health check
router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'TravelVista API is running', timestamp: new Date().toISOString() });
});

export default router;

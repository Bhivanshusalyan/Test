import { Router } from 'express';
import { getFavorites, addFavorite, removeFavorite, checkFavorite } from '../controllers/favorite.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, getFavorites);
router.get('/:placeId/check', authenticate, checkFavorite);
router.post('/:placeId', authenticate, addFavorite);
router.delete('/:placeId', authenticate, removeFavorite);

export default router;

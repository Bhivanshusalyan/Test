import { Router } from 'express';
import { getReviews, createReview, updateReview, deleteReview } from '../controllers/review.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createReviewSchema, updateReviewSchema } from '../schemas/review.schema';

const router = Router();

router.get('/places/:placeId/reviews', getReviews);
router.post('/places/:placeId/reviews', authenticate, validate(createReviewSchema), createReview);
router.put('/reviews/:id', authenticate, validate(updateReviewSchema), updateReview);
router.delete('/reviews/:id', authenticate, deleteReview);

export default router;

import { Router } from 'express';
import { rateArticle } from '../controllers/article';

const router = Router();

router
  .route('/articles/:articleId/ratings')
  .post(rateArticle);

export default router;

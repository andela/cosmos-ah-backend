import { Router } from 'express';
import UpdateArticle from '../controllers/article_tag';

const router = Router();

router.route('/articles/tag/:id').patch(UpdateArticle);

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to the base url',
  });
});

export default router;

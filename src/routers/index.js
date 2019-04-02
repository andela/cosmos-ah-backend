import { Router } from 'express';

const router = Router();

router.get('/', (req, res) =>
  res.status(200).json({
    message: 'Welcome to the Authors Haven API',
  })
);

export default router;

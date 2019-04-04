import { Router } from 'express';
import {
  twitterHandshake,
  twitterCallback,
} from '../controllers/authentication/twitter';
import {
  linkedinHandshake,
  linkedinCallback,
} from '../controllers/authentication/linkedin';

const router = Router();

router.get('/auth/twitter/callback', twitterCallback);
router.get('/auth/twitter', twitterHandshake);

router.get('/auth/linkedin/callback', linkedinCallback);
router.get('/auth/linkedin', linkedinHandshake);

export default router;

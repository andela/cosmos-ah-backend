import { Router } from 'express';
import Auth from '../middlewares/authenticator';
import db from '../models';

const { User } = db;

// Mock routes
const router = Router();
router.post('/users/signup', (req, res) => {
  const {
    // eslint-disable-next-line camelcase
    email, username, full_name, password
  } = req.body;

  User.create({
    full_name, email, username, password
  })
    .then(user => res.status(201).json({
      message: 'user created',
      token: Auth.generateToken({
        id: user.id, username: user.username, email: user.email, role: user.role
      }),
      user
    }))
    .catch((err) => {
      res.status(201).json({ message: 'error', err: err.stack });
    });
});

router.post('/users/signin', (req, res) => {
  const {
    email, password
  } = req.body;
  User.findOne({
    where: {
      email, password
    }
  })
    .then(user => res.status(201).json({
      token: Auth.generateToken({
        id: user.id, username: user.username, email: user.email, role: user.role
      }),
      user
    }))
    .catch((err) => {
      res.status(201).json({ message: 'error', err: err.stack });
    });
});


router.get('/users/articles', Auth.verifyToken, (req, res) => {
  console.log(req.user);
  return res.json({ message: 'yes' });
});

router.get('/users/author', Auth.verifyToken, (req, res) => {
  console.log(req.user);
  return res.json({ message: 'yes author' });
});

export default router;

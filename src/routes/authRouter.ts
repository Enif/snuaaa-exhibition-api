import * as express from 'express';
import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';
import { createToken, verifyTokenMiddleware } from '../middlewares/tokener';

const router = express.Router();

interface NewReq extends express.Request {
  decodedToken: {
    user_id: number
  };
}

router.post('/google', (req, res) => {
  AuthController.authGoogle(req.body)
    .then((user) => createToken({
      user_id: user.get('user_id'),
      nickname: user.get('nickname'),
    }))
    .then((token) => {
      res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      res.status(500)
        .json({
          error: 'internal server error',
          code: 0,
        });
    });
});

router.post('/member', verifyTokenMiddleware, (req: NewReq, res) => {
  AuthController.authMember({
    user_id: req.decodedToken.user_id,
    password: req.body.password,
  })
    .then((user) => {
      if (user) {
        return res.json({
          isMember: user.get('isMember'),
          hasVoted: user.get('hasVoted'),
        });
      }
      return res.status(403).json({
        success: false,
        message: 'invalid user.',
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500)
        .json({
          error: 'internal server error',
          code: 0,
        });
    });
});

router.get('/check', verifyTokenMiddleware, (req: NewReq, res) => {
  UserController.retrieveUser(req.decodedToken.user_id)
    .then((user) => {
      if (user) {
        return createToken({
          user_id: user.get('user_id'),
          nickname: user.get('nickname'),
        });
      }

      return res.status(403).json({
        success: false,
        message: 'Token is not valid.',
      });
    })
    .then((token) => {
      res.json(token);
    })
    .catch((err) => {
      console.error(err);
      res.status(500)
        .json({
          error: 'internal server error',
          code: 0,
        });
    });
});

router.get('/info', verifyTokenMiddleware, (req: NewReq, res) => {
  UserController.retrieveUser(req.decodedToken.user_id)
    .then((user) => {
      if (user) {
        return res.json({
          isMember: user.get('isMember'),
          hasVoted: user.get('didVoted'),
        });
      }
      return res.status(403).json({
        success: false,
        message: 'invalid user.',
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500)
        .json({
          error: 'internal server error',
          code: 0,
        });
    });
});

export default router;

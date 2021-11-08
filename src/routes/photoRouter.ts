import * as express from 'express';
import PhotoController from '../controllers/PhotoController';
import UserController from '../controllers/UserController';
import VoteController from '../controllers/VoteController';
import { verifyTokenMiddleware } from '../middlewares/tokener';

const router = express.Router();

interface AuthorizedReq extends express.Request {
  decodedToken: {
    user_id: number
  }
}

router.get('/', (req, res) => {
  PhotoController.retrievePhotos()
    .then((photos) => {
      res.json(photos);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post('/vote', verifyTokenMiddleware, (req: AuthorizedReq, res) => {
  if (!req.decodedToken || !req.decodedToken.user_id || !req.body.photo_id) {
    return res.status(401).send();
  }

  UserController.retrieveUser(req.decodedToken.user_id)
    .then((user) => {
      const hasVoted = user.get('hasVoted');
      if (hasVoted) {
        return res.status(401).send();
      }
      UserController.updateUserHasVoted(req.decodedToken.user_id)
        .then(() => VoteController.create(req.body.photo_id, user.get('isMember') as boolean))
        .then(() => {
          res.json({
            result: 'success',
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

import * as express from 'express';
import GuestbookController from '../controllers/GuestbookController';
import UserController from '../controllers/UserController';
import { verifyTokenMiddleware } from '../middlewares/tokener';

const router = express.Router();

interface NewReq extends express.Request {
  decodedToken: {
    user_id: number
  };
}

router.get('/', verifyTokenMiddleware, (req, res) => {
  GuestbookController.retrieveGuestBooks()
    .then((data) => {
      res.json(data);
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

router.post('/', verifyTokenMiddleware, async (req: NewReq, res) => {
  try {
    if (req.body.nickname) {
      await UserController.updateNickname(req.decodedToken.user_id, req.body.nickname);
    }
    await GuestbookController.createGuestBook(req.decodedToken.user_id, req.body.text);
    res.json({
      result: 'success',
    });
  } catch (err) {
    res.status(500)
      .json({
        error: 'internal server error',
        code: 0,
      });
  }
});

export default router;

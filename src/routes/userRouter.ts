import * as express from 'express';
import { verifyTokenMiddleware } from '../middlewares/tokener';
import UserController from '../controllers/UserController';

const router = express.Router();


interface nReq extends express.Request {
    decodedToken: {
        user_id: number
    };
}

router.patch('/', verifyTokenMiddleware, (req: nReq, res) => {
    UserController.updateUserNickname(req.decodedToken.user_id, req.body.nickname)
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            console.error(err)
            res.status(500)
                .json({
                    error: 'internal server error',
                    code: 0
                })
        })
})

router.get('/voted', verifyTokenMiddleware, (req: nReq, res) => {
    UserController.retrieveUser(req.decodedToken.user_id)
        .then((user) => {
            res.json({ hasVoted: user.get('hasVoted') })
        })
        .catch((err) => {
            console.error(err)
            res.status(500)
                .json({
                    error: 'internal server error',
                    code: 0
                })
        })
})

export default router;

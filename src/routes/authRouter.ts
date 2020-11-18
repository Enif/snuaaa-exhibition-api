import * as express from 'express';
import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';
import { createToken } from '../middlewares/tokener'
import { verifyTokenMiddleware } from '../middlewares/tokener';

const router = express.Router();

interface nReq extends express.Request {
    decodedToken: {
        user_id: number
    };
}

router.post('/google', (req, res) => {
    AuthController.authGoogle(req.body)
        .then(user => createToken({
            user_id: user.get('user_id'),
            nickname: user.get('nickname')
        }))
        .then((token) => {
            res.json(token)
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

router.get('/check', verifyTokenMiddleware, (req: nReq, res) => {
    UserController.retrieveUser(req.decodedToken.user_id)
        .then((user) => {
            if (user) {
                return createToken({
                    user_id: user.get('user_id'),
                    nickname: user.get('nickname')
                })
            }
            else {
                return res.status(403).json({
                    success: false,
                    message: 'Token is not valid.'
                });

            }
        })
        .then((token) => {
            res.json(token)
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

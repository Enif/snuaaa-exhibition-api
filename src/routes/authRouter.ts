import * as express from 'express';
import AuthController from '../controllers/AuthController';
import { createToken } from '../middlewares/tokener'
// import PhotoController from '../controllers/PhotoController';

const router = express.Router();


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

export default router;

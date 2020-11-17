import * as express from 'express';
import GuestBookController from '../controllers/GuestBookController';
import { verifyTokenMiddleware } from '../middlewares/tokener';

const router = express.Router();

interface nReq extends express.Request {
    decodedToken: {
        user_id: number
    };
}

router.get('/', verifyTokenMiddleware, (req, res) => {
    GuestBookController.retrieveGuestBooks()
        .then((data) => {
            res.json(data)
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


router.post('/', verifyTokenMiddleware, (req: nReq, res) => {
    GuestBookController.createGuestBook(req.decodedToken.user_id, req.body.text)
        .then(() => {
            res.json({
                result: 'success'
            })
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

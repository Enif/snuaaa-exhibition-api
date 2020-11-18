import * as express from 'express';
import PhotoController from '../controllers/PhotoController';
import UserController from '../controllers/UserController';
import { verifyTokenMiddleware } from '../middlewares/tokener';

const router = express.Router();

interface nReq extends express.Request {
    decodedToken: {
        user_id: number
    }
}

router.get('/', (req, res) => {
    PhotoController.retrievePhotos()
        .then((photos) => {
            res.json(photos)
        })
        .catch((err) => {
            console.error(err)
        })
})


router.post('/vote', verifyTokenMiddleware, (req: nReq, res) => {
    if (!req.decodedToken || !req.decodedToken.user_id || !req.body.photo_id) {
        res.status(401).send();
    }
    else {
        UserController.retrieveUser(req.decodedToken.user_id)
            .then((user) => {
                const didVoted = user.get('didVoted');
                if (didVoted) {
                    return res.status(401).send();
                }
                else {
                    UserController.updateUserDidVoted(req.decodedToken.user_id)
                        .then(() => {
                            return PhotoController.increaseVoteNum(req.body.photo_id)
                        })
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
                }
            })
            .catch((err) => {
                console.error(err)
                res.status(500)
                    .json({
                        error: 'internal server error',
                        code: 0
                    })
            })
    }

})

export default router;

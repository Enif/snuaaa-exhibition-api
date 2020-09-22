import * as express from 'express';
import PhotoController from '../controllers/PhotoController';

const router = express.Router();


router.get('/', (req, res) => {
    PhotoController.retrievePhotos()
        .then((photos) => {
            res.json(photos)
        })
        .catch((err) => {
            console.error(err)
        })
})

export default router;

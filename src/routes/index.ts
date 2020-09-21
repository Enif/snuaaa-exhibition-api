import * as express from 'express';
import photoRouter from './photoRouter';

const router = express.Router();

router.use('/photos', photoRouter);

export default router;

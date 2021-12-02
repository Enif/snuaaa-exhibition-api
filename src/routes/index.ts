import * as express from 'express';
import photoRouter from './photoRouter';
import authRouter from './authRouter';
import guestbookRouter from './guestbookRouter';
import userRouter from './userRouter';

const path = require('path');

const router = express.Router();

router.use('/photo', photoRouter);
router.use('/auth', authRouter);
router.use('/guestbook', guestbookRouter);
router.use('/user', userRouter);
router.use('/static', express.static(path.join(__dirname, '..', '..', 'upload')));

export default router;

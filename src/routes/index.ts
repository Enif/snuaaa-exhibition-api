import * as express from 'express';
import photoRouter from './photoRouter';
const path = require('path');

const router = express.Router();

router.use('/photo', photoRouter);
router.use('/static', express.static(path.join(__dirname, '..', '..', 'upload')));

export default router;

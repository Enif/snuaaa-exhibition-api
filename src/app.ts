// const express = require('express');
import * as express from 'express';
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

import * as cors from 'cors';

import indexRouter from './routes';

const app = express();

if (process.env.NODE_ENV == 'develop') {
    // for local test
    app.use(cors())
}
else {
    // [TODO] SET CORS OPTIONS AFTER PUBLISHING
    const corsOptions = {
        origin: 'https://exhibition39.snuaaa.net',
        optionsSuccessStatus: 200
    }
    app.use(cors(corsOptions))
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

const port = process.env.PORT || 8080;


app.listen(port, () => console.log(`Server listening on port ${port}`));

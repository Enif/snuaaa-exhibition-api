import * as jwt from 'jsonwebtoken';

const JWT_EXPIRE = '1d';

const verifyTokenMiddleware = function (req, res, next) {

    console.log(`[${req.method}] ${req.baseUrl + req.url}`);
    const [type, token] = req.headers.authorization
        ? req.headers.authorization.split(" ")
        : [undefined, undefined]

    if (type !== 'Bearer') {
        return res.status(403).json({
            success: false,
            message: 'Token Type Error.'
        });
    }

    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'Token does not exist.'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(403).json({
                success: false,
                CODE: 102
            });
        };
        req.decodedToken = decoded;
        next();
    });
};

const createToken = payload => {

    const jwtOption = {
        expiresIn: JWT_EXPIRE
    };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, jwtOption, (error, token) => {
            if (error) reject(error);
            resolve(token);
        });
    });
};

export {
    verifyTokenMiddleware,
    createToken
}

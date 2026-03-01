import jwt from 'jsonwebtoken';
import { JWT_USER_PASSWORD } from '../config.js';

function userMiddleware (req, res, next) {
    const token = req.headers.token;

    const response = jwt.verify(
        token,
        JWT_USER_PASSWORD
    );

    if(response){
        req.userId = response.id;
        next();
    } else {
        res.json({
            message: "You're not signed in"
        })
    }
};

export {
    userMiddleware,
};
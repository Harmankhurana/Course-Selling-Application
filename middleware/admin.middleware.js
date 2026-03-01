import jwt from 'jsonwebtoken';
import { JWT_ADMIN_PASSWORD } from '../config.js';

function adminMiddleware (req, res, next) {
    const token = req.headers.token;

    const response = jwt.verify(
        token,
        JWT_ADMIN_PASSWORD
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
    adminMiddleware,
};
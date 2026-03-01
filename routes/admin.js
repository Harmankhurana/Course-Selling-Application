import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import { z } from 'zod';
import Router from 'express';
import { JWT_ADMIN_PASSWORD } from '../config.js';
import { adminModel } from '../database/db.js';

const adminRouter = Router();
const saltRounds = 10;

adminRouter.post('/signup', async function (req, res) {
    const requiredBody = z.object({
        firstName: z.string,
        lastName: z.string,
        email: z.string,
        password: z.string,
    });

    const parseDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parseDataWithSuccess.success) {
        res.json({
            message: "Incorrect format used",
            error: parseDataWithSuccess,
        });
    };

    const { firstName, lastName, email, password } = req.body;

    try {
        const hashedPassword = bcrypt.hash(password, saltRounds);
        console.log(hashedPassword);

        await adminModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
        });

        res.json({
            message: "You're signed up in admin page",
        });
    } catch (e) {
        res.json({
            message: "Something went wrong while signing up",
            error: e,
        });
    };
});

adminRouter.post('/signin', async function(req, res) {
    const { email, password } = req.body;

    const response = await adminModel.findOne({
        email: email,
    });

    if (!response) {
        res.json({
            message: "Admin does not exist in our DB!"
        });
    };

    const passwordMatch = bcrypt.compare(password, hashedPassword);

    if(passwordMatch) {
        const token = jwt.sign({
            id: response._id.toString(),
        }, JWT_ADMIN_PASSWORD);
        res.json({
            token: token,
        });
    } else {
        res.json({
            message: "Incorrect credentials",
        })
    }

});

export {
    adminRouter,
}
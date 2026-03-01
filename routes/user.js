import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import Router from 'express';
import { userModel } from '../database/db';

const userRouter = Router();
const saltRounds = 10;

userRouter.post('/signup', async function(req, res) {
    requiredBody = z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        password: z.string(),
    });

    const parseDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parseDataWithSuccess.success) {
        res.json({
            message: "Incorrect format used",
            error: parseDataWithSuccess,
        });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
        const hashedPasswor = bcrypt.hash(password, saltRounds);
        console.log(hashedPasswor);

        await userModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPasswor
        });

        res.json({
            message: "You're signed up in User page"
        })
    } catch (e) {

    }
});

userRouter.post('/signin', async function(req, res) {
    
});

userRouter.post('/purchase', async function(req, res) {
    
});


export {
    userRouter,
}
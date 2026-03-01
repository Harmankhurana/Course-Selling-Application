import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import Router from 'express';
import { userModel } from '../database/db';
import { JWT_USER_PASSWORD } from '../config.js';

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
        return;
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
        res.json({
            message: "Something went wrong while signing up"
        })
    }
});

userRouter.post('/signin', async function(req, res) {
    const { email, password } = req.body;

    const response = await userModel.findOne({
            email: email,
    });

    if (!response) {
        res.json({
            message: "User does not exist in our DB!"
        });
    };
    
    const PasswordMatch = bcrypt.compare(password, PasswordMatch);

    if (PasswordMatch){
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_USER_PASSWORD);
        res.json({
            token: token,
        });        
    } else {
        res.json({
            message: "Incorrect credentials"
        })
    }
});

userRouter.post('/purchases', async function(req, res) {
    
});


export {
    userRouter,
}
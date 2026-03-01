import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import Router from 'express';

const userRouter = Router();

userRouter.post('/signup', async function(req, res) {
    
});

userRouter.post('/signin', async function(req, res) {
    
});

userRouter.post('/purchase', async function(req, res) {
    
});


export {
    userRouter,
}
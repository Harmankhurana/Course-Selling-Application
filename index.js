import express from 'express';
import dotenv from 'dotenv';
// or import { configDotenv } from "dotenv";
// configDotenv();
import mongoose from 'mongoose';
import { userRouter } from './routes/user.js';
import { adminRouter } from './routes/admin.js';
import { courseRouter } from '/routes/course.js';

dotenv.config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const app = express();
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/course', courseRouter);

async function connectionFirst()  {
    await mongoose.connect(MONGO_URL);
    console.log(`MoogoDB is connected with the server`);
    app.listen(PORT, () => {
        console.log(`Server is running`)
    })
};

connectionFirst();

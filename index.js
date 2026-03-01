import express from 'express';
import dotenv from 'dotenv';
// or import { configDotenv } from "dotenv";
// configDotenv();
import mongoose from 'mongoose';

dotenv.config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
app.use(express.json());
const app = express();

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

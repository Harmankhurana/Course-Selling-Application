import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
app.use(express.json());
const app = express();

function connectionFirst()  {
    mongoose.connect(MONGO_URL);
    console.log(`MoogoDB is connected with the server`);
    app.listen(PORT, () => {
        console.log(`Server is running`)
    })
};

connectionFirst();

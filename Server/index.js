import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.get('/test', (res, req) => {
     res.json("test ok")
});

app.listen(process.env.PORT, () => {
     console.log(`Server running in ${process.env.PORT}`);
})
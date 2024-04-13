import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './Routes/user.route.js';
import authRouter from './Routes/auth.route.js'
import postRoute from './Routes/post.route.js'

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
     .then(() => {
          console.log("mongoDB is connected")
     })
     .catch((err) => {
          console.log(err)
     })

app.use('/api/auth', authRouter)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoute)

app.use((err, req, res, next) => {
     const statusCode = err.statusCode || 500
     const message = err.message || 'Internal server Error'
     res.status(statusCode).json({ success: false, statusCode, message })
})

app.listen(process.env.PORT, () => {
     console.log(`Server running in ${process.env.PORT}`);
})
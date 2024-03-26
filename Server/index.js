import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './Routes/user.route.js';
import authRouter from './Routes/auth.route.js'

const app = express();
app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
     .then(() => {
          console.log("mongoDB is connected")
     })
     .catch((err) => {
          console.log(err)
     })

app.use('/api/user', userRoutes)
app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {
     const statusCode = err.statusCode || 500
     const message = err.message || 'Internal server Error'
     res.status(statusCode).json({success:false,statusCode,message})
})

app.listen(process.env.PORT, () => {
     console.log(`Server running in ${process.env.PORT}`);
})
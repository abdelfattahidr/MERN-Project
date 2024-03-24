import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './Routes/user.route.js';

const app = express();
dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
     .then(() => {
          console.log("mongoDB is connected")
     })
     .catch((err) => {
          console.log(err)
     })

app.use('/api/user', userRoutes)

app.listen(process.env.PORT, () => {
     console.log(`Server running in ${process.env.PORT}`);
})
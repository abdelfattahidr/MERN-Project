import User from '../Models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
     const { username, email, password } = req.body;

     if (!username || username === '', !email || email === '', !password || password === '') {
          next(errorHandler(400,'All fields are required'))
     } else {
          const hashPassword = bcryptjs.hashSync(password, 10)
          const newuser = new User({
               username, email, password: hashPassword
          })

          try {
               await newuser.save()
               res.json({ message: 'Signup Successful' })
          } catch (error) {
               next(error)
          }
     }
}
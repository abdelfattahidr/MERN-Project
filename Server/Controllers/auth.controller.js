import User from '../Models/user.model.js'
import bcryptjs from 'bcryptjs'

export const signup = async (req, res) => {
     const { username, email, password } = req.body;

     if (!username || username === '', !email || email === '', !password || password === '') {
          res.status(400).json({ message: 'All fields are required' })
     } else {
          const hashPassword = bcryptjs.hashSync(password, 10)
          const newuser = new User({
               username, email, password: hashPassword
          })

          try {
               await newuser.save()
               res.json({ message: 'Signup Successful' })
          } catch (error) {
               res.status(500).json({ message: error.message })
          }
     }
}
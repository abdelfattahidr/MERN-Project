import express from 'express'
import { verifyToken } from "../utils/verifyUser.js"
import { test,createPost } from "../Controllers/post.controller.js"
const router = express.Router()

router.get('/test', test)
router.post('/create', verifyToken, createPost)

export default router
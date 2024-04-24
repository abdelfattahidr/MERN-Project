import express from 'express'
import { verifyToken } from "../utils/verifyUser.js"
import { test, createPost, getposts, deletePost } from "../Controllers/post.controller.js"
const router = express.Router()

router.get('/test', test)
router.post('/create', verifyToken, createPost)
router.get('/getposts', getposts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost)

export default router
import express from 'express'
import { verifyToken } from "../utils/verifyUser.js"
import { test, createPost, getposts, deletePost,updatepost } from "../Controllers/post.controller.js"
const router = express.Router()

router.get('/test', test)
router.post('/create', verifyToken, createPost)
router.get('/getposts', getposts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost)
router.put('/updatepost/:postId/:userId', verifyToken, updatepost)

export default router
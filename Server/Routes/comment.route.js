import express from 'express'
import { test, createCommet,getPostComments } from '../Controllers/comment.controller.js'
import { verifyToken } from "../utils/verifyUser.js"
const router = express.Router()

router.get('/test', verifyToken, test)
router.post('/create', verifyToken, createCommet)
router.get('/getPostComments/:postId', verifyToken, getPostComments)

export default router
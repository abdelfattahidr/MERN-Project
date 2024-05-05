import express from 'express'
import { test, createCommet, getPostComments, likeComment ,editeComment} from '../Controllers/comment.controller.js'
import { verifyToken } from "../utils/verifyUser.js"
const router = express.Router()

router.get('/test', verifyToken, test)
router.post('/create', verifyToken, createCommet)
router.get('/getPostComments/:postId', verifyToken, getPostComments)
router.put('/likeComment/:commentId', verifyToken, likeComment)
router.put('/editeComment/:commentId', verifyToken, editeComment)

export default router
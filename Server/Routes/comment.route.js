import express from 'express'
import { test, createCommet, getPostComments, likeComment ,editeComment ,deleteComment,getComments} from '../Controllers/comment.controller.js'
import { verifyToken } from "../utils/verifyUser.js"
const router = express.Router()

router.get('/test', verifyToken, test)
router.post('/create', verifyToken, createCommet)
router.get('/getPostComments/:postId', verifyToken, getPostComments)
router.get('/getComments', verifyToken, getComments)
router.put('/likeComment/:commentId', verifyToken, likeComment)
router.put('/editeComment/:commentId', verifyToken, editeComment)
router.delete('/deleteComment/:commentId', verifyToken, deleteComment)

export default router
import Comment from '../Models/comment.model.js'
export const test = (req, res, next) => {
     res.json({ message: 'Api OK from comment' })
}

export const createCommet = async (req, res, next) => {
     try {
          const { content, postId, userId } = req.body
          if (userId !== req.user.id) {
               return next(errorHandler(403, 'You are not allowed to create a comment'))
          }
          const newComment = new Comment({
               content, postId, userId
          })
          await newComment.save()
          res.status(200).json(newComment)
     } catch (error) {
          next(error)
     }
}

export const getPostComments = async (req, res, next) => {
     try {
          const comments = await Comment.find(
               { postId: req.params.postId }
          ).sort(
               { createdAt: -1 }
          )

          res.status(200).json(comments)
     } catch (error) {
          next(error)
     }
}

export const likeComment = async (req, res, next) => {
     try {
          const comment = await Comment.findById(req.params.commentId)
          if (!comment) {
               return next(errorHandler(404, 'Comment not found'))
          }
          const usrIndex = comment.likes.indexOf(req.user.id)
          if (usrIndex === -1) {
               comment.numberOfLikes += 1
               comment.likes.push(req.user.id)
          } else {
               comment.numberOfLikes -= 1
               comment.likes.splice(usrIndex, 1)
          }

          await comment.save()
          res.status(200).json(comment)
     } catch (error) {
          next(error)
     }
}

export const editeComment = async (req, res, next) => {
     try {
          const comment = await Comment.findById(req.params.commentId)
          if (!comment) {
               return next(errorHandler(404, 'Comment not found'))
          }

          if (comment.userId !== req.user.id && !req.user.isAdmin) {
               return next(errorHandler(403, 'You are not allowed to edit this comment'))
          }
          const editeComment = await Comment.findByIdAndUpdate(
               req.params.commentId,
               {
                    content: req.body.content
               },
               { new: true }
          )
          res.status(200).json(editeComment)
     } catch (error) {
          next(error)
     }
}
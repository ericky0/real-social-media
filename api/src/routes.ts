import Router from 'express'
import { Request, Response } from 'express'

import { UsersController } from './controllers/UsersController'
import { AuthController } from './controllers/AuthController'
import { PostController } from './controllers/PostController'
import { ConversationController } from './controllers/ConversationController'
import { MessageController } from './controllers/MessageController'
import { upload } from './config/multer'

const usersController = new UsersController()
const authController = new AuthController()
const postController = new PostController()
const conversationController = new ConversationController()
const messageController = new MessageController()

const router = Router()

// ------------------- AUTH-CONTROLLER ONLY ------------------- /
router.post('/auth/register', authController.createUser)
router.post('/auth/login', authController.authenticateUser)

// ------------------- END AUTH-CONTROLLER ------------------- /

// ------------------- USERS-CONTROLLER ONLY ------------------- /
router.put('/users/:id', usersController.updateUser)
router.delete('/users/:id', usersController.deleteUser)
router.get('/users/', usersController.getUser)
router.get('/users/friends/:userId', usersController.getFriends)
router.put('/users/:id/follow', usersController.followUser)
router.put('/users/:id/unfollow', usersController.unfollowUser)

// ------------------- END USERS-CONTROLLER ------------------- /

// ------------------- POST-CONTROLLER ------------------- /
router.post('/posts/create', postController.createPost)
router.get('/posts/timeline/:userId', postController.getTimelinePosts)
router.get('/posts/profile/:username', postController.getUserPosts)
router.put('/posts/:id', postController.updatePost)
router.delete('/posts/:id', postController.deletePost)
router.put('/posts/:id/like', postController.likePost)
router.get('/posts/:id', postController.getPost)

// ------------------- END POST-CONTROLLER ------------------- /

// ------------------- CONVERSATION-CONTROLLER ------------------- /
router.post('/conversations', conversationController.newConv)
router.get('/conversations/:userId', conversationController.getConv)
router.get(
  '/conversations/:firstUserId/:secondUserId',
  conversationController.getConvTwoUser
)

// ------------------- END-CONVERSATION-CONTROLLER ------------------- /

// ------------------- MESSAGE-CONTROLLER ------------------- /
router.post('/messages', messageController.addMessage)
router.get('/messages/:conversationId', messageController.getMessage)

// ------------------- END-CONTROLLER ------------------- /

// multer
router.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  try {
    return res.status(200).json(res.req.file?.filename)
  } catch (err) {
    console.log(err)
  }
})

export { router }

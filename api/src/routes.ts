import Router from 'express'

import { UsersController } from './controllers/UsersController'
import { AuthController } from './controllers/AuthController'
import { PostController } from './controllers/PostController';

const usersController = new UsersController;
const authController = new AuthController;
const postController = new PostController;

const router = Router()

// ------------------- AUTH-CONTROLLER ONLY ------------------- /

router.post("/auth/register", authController.createUser)
router.post("/auth/login", authController.authenticateUser)

// ------------------- END AUTH-CONTROLLER ------------------- /


// ------------------- USERS-CONTROLLER ONLY ------------------- /

router.put("/users/:id", usersController.updateUser)
router.delete("/users/:id", usersController.deleteUser)
router.get("/users/", usersController.getUser)
router.put("/users/:id/follow", usersController.followUser)
router.put("/users/:id/unfollow", usersController.unfollowUser)

// ------------------- END USERS-CONTROLLER ------------------- /


// ------------------- POST-CONTROLLER ------------------- /

router.post("/posts/create", postController.createPost)
router.get("/posts/timeline/:userId", postController.getTimelinePosts)
router.get("/posts/profile/:username", postController.getUserPosts)
router.put("/posts/:id", postController.updatePost)
router.delete("/posts/:id", postController.deletePost)
router.put("/posts/:id/like", postController.likePost)
router.get("/posts/:id", postController.getPost)

// ------------------- END POST-CONTROLLER ------------------- /


export { router }
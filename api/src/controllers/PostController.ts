import { Post } from '../models/Post'
import { Request, Response } from 'express'
import { User } from '../models/User'

class PostController {
  // ------------------- CREATE A POST ------------------- /
  async createPost(req: Request, res: Response) {
    const newPost = new Post(req.body)
    try {
      const savedPost = await newPost.save()
      res.status(200).json(savedPost)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  // ------------------- UPDATE A POST ------------------- /
  async updatePost(req: Request, res: Response) {
    
    try { 
      const post = await Post.findById(req.params.id)

      if(post?.userId === req.body.userId) {
        await post?.updateOne({$set: req.body})
        res.status(200).json("Post updated successfully")
      } else {
        res.status(403).json("You can only update your posts")
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }

  // ------------------- DELETE A POST ------------------- /
  async deletePost(req: Request, res: Response) {
    
    try { 
      const post = await Post.findById(req.params.id)

      if(post?.userId === req.body.userId) {
        await post?.deleteOne()
        res.status(200).json("Post deleted successfully")
      } else {
        res.status(403).json("You can only delete your posts")
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }

  // ------------------- LIKE / DISLIKE A POST ------------------- /
  async likePost(req: Request, res: Response) {
    try {
      const post = await Post.findById(req.params.id)
      if(!post?.likes.includes(req.body.userId)){
        await post?.updateOne({$push: {likes: req.body.userId}})
        res.status(200).json("the post has been liked")
      } else {
        await post?.updateOne({$pull: {likes: req.body.userId}})
        res.status(200).json("the post has been disliked")

      }
    } catch (err) {
      res.status(500).json(err)
    }
  }

  // ------------------- GET A POST ------------------- /
  async getPost(req: Request, res: Response) {
    try {
      const post = await Post.findById(req.params.id)
      res.status(200).json(post)
    } catch (err) {
      res.status(500).json(err)     
    }
  }

  // ------------------- GET TIMELINE POSTS ------------------- /
  async getTimelinePosts(req: Request, res: Response) {
    console.log('eae')
    try {
      const currentUser = await User.findById(req.body.userId)
      console.log(currentUser)
      const userPosts = await Post.find({userId: currentUser?._id})
      console.log(userPosts)
      const friendPosts = await Promise.all(
        currentUser!.followings.map(async (friendId) => {
          return await Post.find({userId: friendId})
        })
      )
      console.log(friendPosts)
      res.json(userPosts.concat(...friendPosts))
    } catch (err)  {
      res.status(500).json(err) 
    }
  }

}

export {PostController}
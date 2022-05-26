import { User } from '../models/User'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

class UsersController {
  // ------------------- UPDATE USER ------------------- /
  async updateUser(req: Request, res: Response) {
    
    if(req.body.userId === req.params.id || req.body.isAdmin) {
      
      // protect information
      if(req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10)
          req.body.password = await bcrypt.hash(req.body.password, salt)
        } catch (err) {
          return res.status(500).json(err)
        }
      }

      // find the user by his id and update information
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body
        })
        res.status(200).json('account has been updated successfully')
      } catch(err) {
        return res.status(500).json(err)
      }

    } else {
      return res.status(403).json("You can update only your account!")
    }
  }
  // ------------------- DELETE USER ------------------- /

  async deleteUser(req: Request, res: Response) {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json('Account has been deleted successfully.')
      } catch(err) {
        return res.status(500).json(err)
      }
    } else {
      return res.status(403).json("You can update only your account!")
    }
  }

  // ------------------- GET USER ------------------- /
  async getUser(req: Request, res: Response) {
    const userid = req.query.userid
    const username = req.query.username
    try {
      const user = userid ? 
      await User.findById(userid): 
      await User.findOne({username: username})
      // _doc doesn't exists in IUser but it exists in mongoose.Document, thats why we expect a error from typescript there
      //@ts-expect-error
      const { password, updatedAt, ...other } = user._doc
      res.status(200).json(other)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  // ------------------- FOLLOW USER ------------------- /
  async followUser(req: Request, res: Response) {
    if(req.body.userId !== req.params.id) {

      try {
        const user = await User.findById(req.params.id)
        const currentUser = await User.findById(req.body.userId)

        if(!user?.followers.includes(currentUser!._id)) {

          // push users into their respective arrays
          await user?.updateOne({$push: {followers: currentUser!._id}})
          await currentUser?.updateOne({$push: {followings: user!._id}})
          res.status(200).json("user has been successfully followed.")

        } else {
          res.status(403).json("you already follow this user.")
        }
      } catch(err) {
        res.status(500).json(err)
      }
    } else {
      res.status(403).json("You can't follow yourself.")
    }
  }

  // ------------------- UN-FOLLOW USER ------------------- /
  async unfollowUser(req: Request, res: Response) {
    if(req.body.userId !== req.params.id) {

      try {
        const user = await User.findById(req.params.id)
        const currentUser = await User.findById(req.body.userId)

        if(user?.followers.includes(currentUser!._id)) {

          // pull users from their respective arrays
          await user?.updateOne({$pull: {followers: currentUser!._id}})
          await currentUser?.updateOne({$pull: {followings: user!._id}})
          res.status(200).json("User has been unfollowed.")

        } else {
          res.status(403).json("You don't follow this user.")
        }
      } catch(err) {
        res.status(500).json(err)
      }
    } else {
      res.status(403).json("You can't unfollow yourself.")
    }
  }
}

export { UsersController }
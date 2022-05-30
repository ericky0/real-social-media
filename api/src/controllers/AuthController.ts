import { User } from '../models/User'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

class AuthController {
  // ------------------- REGISTER AND ENCRYPT PASSWORD ------------------- /

  async createUser(req: Request, res: Response) {
    try {
      // encrypt/hash password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)

      // create new user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
      })

      // save user into database & response
      const user = await newUser.save()
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  // ------------------- LOG-IN ------------------- /

  async authenticateUser(req: Request, res: Response) {
    try {
      // find user into database by his email address
      const user = await User.findOne({ email: req.body.email })

      // then check if the user exists
      !user && res.status(404).send('user not found')

      // compare the password informed to the database password
      const validPassword = await bcrypt.compare(
        req.body.password,
        user!.password
      )
      !validPassword && res.status(400).json('wrong password')

      // response
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

export { AuthController }

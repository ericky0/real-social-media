import { Request, Response } from 'express'
import { Conversation } from '../models/Conversation'

class ConversationController {
  // ------------------- CREATE NEW CONVERSATION ------------------- /
  async newConv(req: Request, res: Response) {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId]
    })

    try {
      const savedConversation = await newConversation.save()
      res.status(200).json(savedConversation)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  // ------------------- GET CONVERSATION OF A USER ------------------- /

  async getConv(req: Request, res: Response) {
    try {
      const conversation = await Conversation.find({
        members: {
          $in: [req.params.userId]
        }
      })
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  // ------------------- GET CONVERSATION INCLUDES TWO USERID ------------------- /

  async getConvTwoUser(req: Request, res: Response) {
    try {
      const conversation = await Conversation.findOne({
        members: {
          $all: [req.params.firstUserId, req.params.secondUserId]
        }
      })
      res.status(200).json(conversation)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export { ConversationController }

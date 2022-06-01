import { Request, Response } from 'express'
import { Message } from '../models/Message'

class MessageController {
  // ------------------- ADD A POST ------------------- /
  async addMessage(req: Request, res: Response) {
    const newMessage = new Message(req.body)

    try {
      const savedMessage = await newMessage.save()
      res.status(200).json(savedMessage)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  // ------------------- GET A POST ------------------- /
  async getMessage(req: Request, res: Response) {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId
      })
      res.status(200).json(messages)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

export { MessageController }

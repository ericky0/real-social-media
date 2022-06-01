import { model, Schema, Model, Document } from 'mongoose'

interface IMessage extends Document {
  conversationId: string
  sender: string
  text: string
}

const MessageSchema: Schema = new Schema(
  {
    conversationId: {
      type: String
    },
    sender: {
      type: String
    },
    text: {
      type: String
    }
  },
  { timestamps: true }
)

export const Message: Model<IMessage> = model('Message', MessageSchema)

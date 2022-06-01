import { model, Schema, Model, Document } from 'mongoose'

interface IConversation extends Document {
  members: string[]
}

const ConversationSchema: Schema = new Schema(
  {
    members: {
      type: Array
    }
  },
  { timestamps: true }
)

export const Conversation: Model<IConversation> = model(
  'Conversation',
  ConversationSchema
)

import { model, Schema, Model, Document } from 'mongoose'

interface IPost extends Document {
  userId: string
  desc: string
  img: string
  likes: any[]
  comments: number
}

const PostSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },

    desc: {
      type: String,
      max: 50
    },

    img: {
      type: String
    },

    likes: {
      type: Array,
      default: []
    },

    comments: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

export const Post: Model<IPost> = model('Post', PostSchema)

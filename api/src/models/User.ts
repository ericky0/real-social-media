import {model, Schema, Model, Document} from 'mongoose';



interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  coverPicture: string;
  followers: IUser[];
  followings: IUser[];
  isAdmin: boolean;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true
  },
  
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true
  },

  password: {
    type: String,
    required: true,
    min: 6
  },

  profilePicture: {
    type: String,
    default: ""
  },

  coverPicture: {
    type: String,
    default: ""
  },

  followers: {
    type: Array,
    default: []
  },

  followings: {
    type: Array,
    default: []
  },

  isAdmin: {
    type: Boolean,
    default: false
  },

  desc: {
    type: String,
    max: 50
  },

  city: {
    type: String,
    max: 50
  },

  from: {
    type: String,
    max: 50
  },

  relationship: {
    type: Number,
    enum: [1, 2, 3]
  }

  
},
  { timestamps: true }
)

export const User: Model<IUser> = model('User', UserSchema);
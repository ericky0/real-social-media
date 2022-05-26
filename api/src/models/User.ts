import {model, Schema, Model, Document} from 'mongoose';



interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  coverPicture?: string;
  followers: IUser[];
  followings: IUser[];
  isAdmin?: boolean;
  desc?: string;
  from?: string;
  city?: string;
  relationship?: number;
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
    default: "",
    max: 50
  },

  city: {
    type: String,
    default: "",
    max: 50
  },

  from: {
    type: String,
    default: "",
    max: 50
  },

  relationship: {
    type: Number,
    default: 1,
    enum: [1, 2, 3]
  }

  
},
  { timestamps: true }
)

export const User: Model<IUser> = model('User', UserSchema);
export type User = {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
  coverPicture?: string;
  followers?: User[];
  followings?: User[];
  isAdmin?: boolean;
  desc?: string;
  city?: string;
  from?: string;
  relationship?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export type Post = {
  _id?: string;
  userId?: string;
  desc?: string;
  img?: string;
  likes?: any[];
  comments?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
import { Model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IUser {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  // faculty?: Types.ObjectId | IFaculty; //Future
  // admin?: Types.ObjectId | IAdmin;  //Future
}
export type UserModel = Model<IUser, Record<string, unknown>>;

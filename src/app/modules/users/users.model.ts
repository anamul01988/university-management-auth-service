import { Model, Schema, model } from 'mongoose'
import { IUser } from './users.interface'

type UserModel = Model<IUser, object> //query bebohar lagbe nah tai {} apatoto falai dilam

const userSchema = new Schema<IUser, UserModel>({
  id: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
})
export const User = model<IUser, UserModel>('User', userSchema)

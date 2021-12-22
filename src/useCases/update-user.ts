import { UserModel } from "../models/user";

export interface UpdateUserModel {
  _id?: string
  name: string
  email: string
}

export interface UpdateUser {
  update (id: string, user: UpdateUserModel): Promise<UserModel>
}
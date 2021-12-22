import { UserModel } from "../models/user";

export interface AddUserModel {
  name: string
  email: string
}

export interface AddUser {
  add (account: AddUserModel): Promise<UserModel>
}
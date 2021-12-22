import { USER_COLLECTION } from '../constants'
import { MongoHelper } from '../helpers/mongo-helper'
import { AddUser, AddUserModel } from '../useCases/add-user'
import { UpdateUser, UpdateUserModel } from '../useCases/update-user'

export class UserMongoRepository implements AddUser, UpdateUser{
  async add (userData: AddUserModel): Promise<any> {
    const userCollection = await MongoHelper.getCollection(USER_COLLECTION)
    const result = await userCollection.insertOne(userData)

    return await userCollection.findOne({ _id: result.insertedId})
  }

  async update(id: any, user: UpdateUserModel): Promise<any> {
    const userCollection = await MongoHelper.getCollection(USER_COLLECTION)
    await userCollection.updateOne({ _id: id },
    {
      $set: user,
    },
    { upsert: true })

    return await userCollection.findOne({ _id: id })
  }
}

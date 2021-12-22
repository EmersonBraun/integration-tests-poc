import { MongoHelper } from '../helpers/mongo-helper'
import { AddUserModel } from '../useCases/add-user'

export class UserMongoRepository {
  async add (userData: AddUserModel): Promise<any> {
    const userCollection = await MongoHelper.getCollection('users')
    const result = await userCollection.insertOne(userData)

    return await userCollection.findOne({ _id: result.insertedId})
  }
}

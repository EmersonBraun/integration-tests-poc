import { USER_COLLECTION } from "../constants";
import { MongoHelper } from "../helpers/mongo-helper";
import { AddUser, AddUserModel } from "../useCases/add-user";

export class UserMongoRepository implements AddUser {
  async add(userData: AddUserModel): Promise<any> {
    const userCollection = await MongoHelper.getCollection(USER_COLLECTION);
    const result = await userCollection.insertOne(userData);

    return await userCollection.findOne({ _id: result.insertedId });
  }
}

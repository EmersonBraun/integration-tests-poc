import { USER_COLLECTION } from "../constants";
import { MongoHelper } from "../helpers/mongo-helper";
import { UserMongoRepository } from "./user-repository";

describe("Repository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });
  test("should return an user on success", async () => {
    const sut = new UserMongoRepository();
    const user = await sut.add({
      name: "any",
      email: "any@any.com",
    });

    expect(user).toBeTruthy();
    expect(user.name).toBe("any");
    expect(user.email).toBe("any@any.com");
  });

  test("should update an user on success", async () => {
    const sut = new UserMongoRepository();
    const userCollection = await MongoHelper.getCollection(USER_COLLECTION);
    const id = await userCollection.find({}).id;
    console.log(id);

    const user = await sut.update(
      id,
      {
          name: "updated",
          email: "updated@updated.com",
      },
    );

    expect(user).toBeTruthy();
    expect(user.name).toBe("updated");
    expect(user.email).toBe("updated@updated.com");
  });
});

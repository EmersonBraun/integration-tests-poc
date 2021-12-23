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
});

import { USER_COLLECTION } from '../constants'
import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection(USER_COLLECTION)
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection(USER_COLLECTION)
    expect(accountCollection).toBeTruthy()
  })

  test('Should reconnect if mongodb if not got client', async () => {
    const connect = jest.spyOn(sut, 'connect')
    sut.client = null
    let accountCollection = await sut.getCollection(USER_COLLECTION)
    expect(connect).toHaveBeenCalled()
    expect(accountCollection).toBeTruthy()
  })
})

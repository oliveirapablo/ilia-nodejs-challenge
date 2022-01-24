import { MongoHelper } from '../helpers/mongo-helper'
import { TransactionMongoRepository } from './get-transaction'

describe('Transaction Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('transactions')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): TransactionMongoRepository => {
    return new TransactionMongoRepository()
  }

  test('Shoul return an transaction on success', async () => {
    const sut = makeSut()
    const transaction = await sut.find({
      user_id: 'valid_user_id'
    })

    expect(transaction).toBeTruthy()
    expect(transaction.transactions).toBeTruthy()
  })
})

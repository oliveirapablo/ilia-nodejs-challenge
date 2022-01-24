import { MongoHelper } from '../helpers/mongo-helper'
import { BalanceTransactionMongoRepository } from './balance-transaction'

describe('Balance Transaction Mongo Repository', () => {
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

  const makeSut = (): BalanceTransactionMongoRepository => {
    return new BalanceTransactionMongoRepository()
  }

  test('Shoul return amount on success', async () => {
    const sut = makeSut()
    const amount = await sut.balance()

    expect(amount).toBeTruthy()
  })
})

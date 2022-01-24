import { MongoHelper } from '../helpers/mongo-helper'
import { TransactionMongoRepository } from './transaction'
enum TypesTransaction {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT'
}

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
    const transaction = await sut.add({
      user_id: 'valid_user_id',
      amount: 30,
      type: TypesTransaction.CREDIT
    })

    expect(transaction).toBeTruthy()
    expect(transaction.id).toBeTruthy()
    expect(transaction.user_id).toBe('valid_user_id')
    expect(transaction.type).toBe('CREDIT')
    expect(transaction.amount).toBe(30)
  })
})

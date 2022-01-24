import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Transactions Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('transactions')
    await accountCollection.deleteMany({})
  })
  test('Shoul return an transaction on success', async () => {
    await request(app)
      .post('/transactions')
      .send({
        user_id: 'any_user_id',
        type: 'DEBIT',
        amount: 30
      })
      .expect(200)
  })
})

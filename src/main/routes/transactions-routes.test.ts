import request from 'supertest'
import app from '../config/app'

describe('Transactions Routes', () => {
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

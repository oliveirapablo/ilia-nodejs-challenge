import { CreateTransactionController } from './create-transaction'
import { MissingParamError, InvalidParamError, ServerError } from '../../errors'

interface SutTypes {
  sut: CreateTransactionController
}

const makeSut = (): SutTypes => {
  const sut = new CreateTransactionController()
  return {
    sut
  }
}

describe('CreateTransactionController', () => {
  test('Should return 400 if no user_id is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        type: 'any_type',
        amout: 'any_amount'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('user_id'))
  })
})

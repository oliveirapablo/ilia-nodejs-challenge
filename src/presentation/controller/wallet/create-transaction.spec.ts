import { CreateTransactionController } from './create-transaction'
import { MissingParamError, InvalidParamError, ServerError } from '../../errors'
import { AddTransaction, AddTransactionModel, TransactionModel, TypesTransaction } from './wallet-protocols'

const makeAddTransaction = (): AddTransaction => {
  class AddATransactionStub implements AddTransaction {
    async add (transaction: AddTransactionModel): Promise<TransactionModel> {
      const fakeTransaction = {
        id: 'valid_id',
        user_id: 'valid_user_id',
        amount: 30,
        type: TypesTransaction.CREDIT
      }
      return await new Promise(resolve => resolve(fakeTransaction))
    }
  }
  return new AddATransactionStub()
}

interface SutTypes {
  sut: CreateTransactionController
  addTransactionStub: AddTransaction
}

const makeSut = (): SutTypes => {
  const addTransactionStub = makeAddTransaction()
  const sut = new CreateTransactionController(addTransactionStub)
  return {
    sut,
    addTransactionStub
  }
}

describe('CreateTransactionController', () => {
  test('Should return 400 if no user_id is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        type: 'any_type',
        amount: 'any_amount'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('user_id'))
  })

  test('Should return 400 if no type is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        user_id: 'any_user_id',
        amount: 'any_amount'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('type'))
  })

  test('Should return 400 if no amout is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        user_id: 'any_user_id',
        type: 'any_type'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('amount'))
  })

  test('Should return 400 if type is not permited to provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        user_id: 'any_user_id',
        type: 'any_type',
        amount: 'any_amount'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('type'))
  })

  test('Should call AddTransaction with correct values', async () => {
    const { sut, addTransactionStub } = makeSut()
    const addSpy = jest.spyOn(addTransactionStub, 'add')

    const httpRequest = {
      body: {
        user_id: 'any_user_id',
        type: 'CREDIT',
        amount: 'any_amount'
      }
    }
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      user_id: 'any_user_id',
      type: 'CREDIT',
      amount: 'any_amount'
    })
  })

  test('Should return 500 if AddTransaction throws', async () => {
    const { sut, addTransactionStub } = makeSut()
    jest.spyOn(addTransactionStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        user_id: 'any_user_id',
        type: 'CREDIT',
        amount: 'any_amount'
      }
    }
    const httResponse = await sut.handle(httpRequest)
    expect(httResponse.statusCode).toBe(500)
    expect(httResponse.body).toEqual(new ServerError())
  })
  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        user_id: 'valid_user_id',
        amount: 30,
        type: 'CREDIT'
      }
    }
    const httResponse = await sut.handle(httpRequest)
    expect(httResponse.statusCode).toBe(200)
    expect(httResponse.body).toEqual({
      id: 'valid_id',
      user_id: 'valid_user_id',
      amount: 30,
      type: 'CREDIT'
    })
  })
})

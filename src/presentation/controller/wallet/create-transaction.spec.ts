import { CreateTransactionController } from './create-transaction'
import { MissingParamError, InvalidParamError } from '../../errors'
import { AddTransaction, AddTransactionModel, HttpRequest, TransactionModel, TypesTransaction } from './wallet-protocols'
import { ok, serverError, badRequest } from '../../helpers/http-helper'
const makeAddTransaction = (): AddTransaction => {
  class AddATransactionStub implements AddTransaction {
    async add (transaction: AddTransactionModel): Promise<TransactionModel> {
      return await new Promise(resolve => resolve(makeFakeTransaction()))
    }
  }
  return new AddATransactionStub()
}

interface SutTypes {
  sut: CreateTransactionController
  addTransactionStub: AddTransaction
}

const makeFakeTransaction = (): TransactionModel => ({
  id: 'valid_id',
  user_id: 'valid_user_id',
  amount: 30,
  type: TypesTransaction.CREDIT
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    user_id: 'valid_user_id',
    amount: 30,
    type: 'CREDIT'
  }
})

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
    expect(httpResponse).toEqual(badRequest(new MissingParamError('user_id')))
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
    expect(httpResponse).toEqual(badRequest(new MissingParamError('type')))
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
    expect(httpResponse).toEqual(badRequest(new MissingParamError('amount')))
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
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('type')))
  })

  test('Should call AddTransaction with correct values', async () => {
    const { sut, addTransactionStub } = makeSut()
    const addSpy = jest.spyOn(addTransactionStub, 'add')

    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })

  test('Should return 500 if AddTransaction throws', async () => {
    const { sut, addTransactionStub } = makeSut()
    jest.spyOn(addTransactionStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })

    const httResponse = await sut.handle(makeFakeRequest())
    expect(httResponse).toEqual(serverError())
  })
  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httResponse = await sut.handle(makeFakeRequest())
    expect(httResponse).toEqual(ok(makeFakeTransaction()))
  })
})

import { GetTransactionController } from './get-transactions'
import { GetTransaction, GetTransactionModel, HttpRequest, TransactionsModel, TypesTransaction } from './wallet-protocols'
import { ok, serverError } from '../../helpers/http-helper'
const makeGetTransaction = (): GetTransaction => {
  class GetATransactionStub implements GetTransaction {
    async find (userId?: GetTransactionModel): Promise<TransactionsModel> {
      return await new Promise(resolve => resolve(makeFakeTransaction()))
    }
  }
  return new GetATransactionStub()
}

interface SutTypes {
  sut: GetTransactionController
  getTransactionsStub: GetTransaction
}

const makeFakeTransaction = (): TransactionsModel => ({
  transactions: [{
    id: 'valid_id',
    user_id: 'valid_user_id',
    amount: 30,
    type: TypesTransaction.CREDIT
  }]
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    user_id: 'valid_user_id'
  }
})

const makeSut = (): SutTypes => {
  const getTransactionsStub = makeGetTransaction()
  const sut = new GetTransactionController(getTransactionsStub)
  return {
    sut,
    getTransactionsStub
  }
}

describe('GetTransactionController', () => {
  test('Should call GetTransaction with correct values', async () => {
    const { sut, getTransactionsStub } = makeSut()
    const getSpy = jest.spyOn(getTransactionsStub, 'find')

    await sut.handle(makeFakeRequest())
    expect(getSpy).toHaveBeenCalledWith()
  })

  test('Should return 500 if GetTransaction throws', async () => {
    const { sut, getTransactionsStub } = makeSut()
    jest.spyOn(getTransactionsStub, 'find').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })

    const httResponse = await sut.handle(makeFakeRequest())
    expect(httResponse).toEqual(serverError())
  })
  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httResponse = await sut.handle(makeFakeRequest())
    const { transactions } = makeFakeTransaction()
    expect(httResponse).toEqual(ok(transactions))
  })
})

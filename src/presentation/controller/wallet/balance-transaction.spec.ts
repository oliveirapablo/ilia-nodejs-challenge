import { BalanceTransactionController } from './balance-transaction'
import { BalanceTransaction, BalanceTransactionModel, HttpRequest } from './wallet-protocols'
import { ok, serverError } from '../../helpers/http-helper'

const makeBalance = (): BalanceTransaction => {
  class GetBalanceTransactionStub implements BalanceTransaction {
    async balance (): Promise<BalanceTransactionModel> {
      return await new Promise(resolve => resolve(makeFakeBalance()))
    }
  }
  return new GetBalanceTransactionStub()
}

interface SutTypes {
  sut: BalanceTransactionController
  balanceTransactionsStub: BalanceTransaction
}

const makeFakeBalance = (): BalanceTransactionModel => ({
  amount: 30
})

const makeFakeRequest = (): HttpRequest => ({
  body: {}
})

const makeSut = (): SutTypes => {
  const balanceTransactionsStub = makeBalance()
  const sut = new BalanceTransactionController(balanceTransactionsStub)
  return {
    sut,
    balanceTransactionsStub
  }
}

describe('GetTransactionController', () => {
  test('Should call GetBalanceTransactionStub with correct values', async () => {
    const { sut, balanceTransactionsStub } = makeSut()
    const getSpy = jest.spyOn(balanceTransactionsStub, 'balance')

    await sut.handle(makeFakeRequest())
    expect(getSpy).toHaveBeenCalledWith()
  })

  test('Should return 500 if GetBalanceTransactionStub throws', async () => {
    const { sut, balanceTransactionsStub } = makeSut()
    jest.spyOn(balanceTransactionsStub, 'balance').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })

    const httResponse = await sut.handle(makeFakeRequest())
    expect(httResponse).toEqual(serverError())
  })
  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httResponse = await sut.handle(makeFakeRequest())
    const { amount } = makeFakeBalance()
    expect(httResponse).toEqual(ok(amount))
  })
})

import { BalanceTransactionRepository, BalanceTransactionModel } from './db-balance-transaction-protocols'
import { DbBalanceTransaction } from './db-balance-transaction'

const makeFakeTransaction = (): BalanceTransactionModel => ({
  amount: 300
})

const makeBalanceTransactionRepository = (): BalanceTransactionRepository => {
  class BalanceTransactionRepositoryStub implements BalanceTransactionRepository {
    async balance (): Promise<BalanceTransactionModel> {
      return await new Promise(resolve => resolve(makeFakeTransaction()))
    }
  }
  return new BalanceTransactionRepositoryStub()
}

interface SutTypes {
  sut: DbBalanceTransaction
  balanceTransactionRepositoryStub: BalanceTransactionRepository
}

const makeSut = (): SutTypes => {
  const balanceTransactionRepositoryStub = makeBalanceTransactionRepository()
  const sut = new DbBalanceTransaction(balanceTransactionRepositoryStub)

  return {
    sut,
    balanceTransactionRepositoryStub
  }
}

describe('DbBalanceTransaction Usecase', () => {
  test('Should call BalanceTransactionRepository with correct values', async () => {
    const { sut, balanceTransactionRepositoryStub } = makeSut()
    const balanceSpy = jest.spyOn(balanceTransactionRepositoryStub, 'balance')

    await sut.balance()

    expect(balanceSpy).toHaveBeenCalledWith()
  })

  test('Should throw if BalanceTransactionRepository throws', async () => {
    const { sut, balanceTransactionRepositoryStub } = makeSut()
    jest.spyOn(balanceTransactionRepositoryStub, 'balance')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.balance()
    await expect(promise).rejects.toThrow('')
  })

  test('Should returns balance on success', async () => {
    const { sut } = makeSut()
    const transaction = await sut.balance()
    expect(transaction).toEqual(makeFakeTransaction())
  })
})

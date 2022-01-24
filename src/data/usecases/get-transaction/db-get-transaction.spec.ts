import { TransactionsModel, GetTransactionRepository, GetTransactionModel } from './db-get-transaction-protocols'
import { DbGetTransaction } from './db-get-transaction'

enum TypesTransaction {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT'
}

const makeFakeTransaction = (): TransactionsModel => ({
  transactions: [{
    id: 'valid_id',
    user_id: 'valid_user_id',
    amount: 30,
    type: TypesTransaction.CREDIT
  }]
})

const makeFakeTransactionData = (): any => ({
})

const makeGetTransactionRepository = (): GetTransactionRepository => {
  class GetTransactionRepositoryStub implements GetTransactionRepository {
    async find (userId: GetTransactionModel): Promise<TransactionsModel> {
      return await new Promise(resolve => resolve(makeFakeTransaction()))
    }
  }
  return new GetTransactionRepositoryStub()
}

interface SutTypes {
  sut: DbGetTransaction
  getTransactionRepositoryStub: GetTransactionRepository
}

const makeSut = (): SutTypes => {
  const getTransactionRepositoryStub = makeGetTransactionRepository()
  const sut = new DbGetTransaction(getTransactionRepositoryStub)

  return {
    sut,
    getTransactionRepositoryStub
  }
}

describe('DbGetTransaction Usecase', () => {
  test('Should call GetTransactionRepository with correct values', async () => {
    const { sut, getTransactionRepositoryStub } = makeSut()
    const findSpy = jest.spyOn(getTransactionRepositoryStub, 'find')

    await sut.find(makeFakeTransactionData())

    expect(findSpy).toHaveBeenCalledWith(makeFakeTransactionData())
  })

  test('Should throw if GetTransactionRepository throws', async () => {
    const { sut, getTransactionRepositoryStub } = makeSut()
    jest.spyOn(getTransactionRepositoryStub, 'find')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.find(makeFakeTransactionData())
    await expect(promise).rejects.toThrow('')
  })

  test('Should returns transactions on success', async () => {
    const { sut } = makeSut()
    const transaction = await sut.find(makeFakeTransactionData())
    expect(transaction).toEqual(makeFakeTransaction())
  })
})

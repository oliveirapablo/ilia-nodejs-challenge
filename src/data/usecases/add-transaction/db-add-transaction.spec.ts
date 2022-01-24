import { TransactionModel, AddTransactionModel, AddTransactionRepository } from './db-add-transaction-protocols'
import { DbAddTransaction } from './db-add-transaction'

enum TypesTransaction {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT'
}

const makeFakeTransaction = (): TransactionModel => ({
  id: 'valid_id',
  user_id: 'valid_user_id',
  amount: 30,
  type: TypesTransaction.CREDIT
})

const makeFakeTransactionData = (): AddTransactionModel => ({
  user_id: 'valid_user_id',
  amount: 30,
  type: TypesTransaction.CREDIT
})

const makeAddTransactionRepository = (): AddTransactionRepository => {
  class AddTransactionRepositoryStub implements AddTransactionRepository {
    async add (accountData: AddTransactionModel): Promise<TransactionModel> {
      return await new Promise(resolve => resolve(makeFakeTransaction()))
    }
  }
  return new AddTransactionRepositoryStub()
}

interface SutTypes {
  sut: DbAddTransaction
  addTransactionRepositoryStub: AddTransactionRepository
}

const makeSut = (): SutTypes => {
  const addTransactionRepositoryStub = makeAddTransactionRepository()
  const sut = new DbAddTransaction(addTransactionRepositoryStub)

  return {
    sut,
    addTransactionRepositoryStub
  }
}

describe('DbAddTransaction Usecase', () => {
  test('Should call AddTransactionRepository with correct values', async () => {
    const { sut, addTransactionRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addTransactionRepositoryStub, 'add')

    await sut.add(makeFakeTransactionData())

    expect(addSpy).toHaveBeenCalledWith(makeFakeTransactionData())
  })

  test('Should throw if AddTransactionRepository throws', async () => {
    const { sut, addTransactionRepositoryStub } = makeSut()
    jest.spyOn(addTransactionRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeTransactionData())
    await expect(promise).rejects.toThrow('')
  })

  test('Should an transaction on success', async () => {
    const { sut } = makeSut()
    const transaction = await sut.add(makeFakeTransactionData())
    expect(transaction).toEqual(makeFakeTransaction())
  })
})

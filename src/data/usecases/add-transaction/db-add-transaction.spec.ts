import { TransactionModel, AddTransactionModel, AddTransactionRepository } from './db-add-transaction-protocols'
import { DbAddTransaction } from './db-add-transaction'

enum TypesTransaction {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT'
}

const makeAddTransactionRepository = (): AddTransactionRepository => {
  class AddTransactionRepositoryStub implements AddTransactionRepository {
    async add (accountData: AddTransactionModel): Promise<TransactionModel> {
      const fakeTransaction = {
        id: 'valid_id',
        user_id: 'valid_user_id',
        amount: 30,
        type: TypesTransaction.CREDIT
      }
      return await new Promise(resolve => resolve(fakeTransaction))
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

    const transactionData = {
      user_id: 'valid_user_id',
      type: TypesTransaction.CREDIT,
      amount: 30
    }
    await sut.add(transactionData)

    expect(addSpy).toHaveBeenCalledWith({
      user_id: 'valid_user_id',
      type: TypesTransaction.CREDIT,
      amount: 30
    })
  })

  test('Should throw if AddTransactionRepository throws', async () => {
    const { sut, addTransactionRepositoryStub } = makeSut()
    jest.spyOn(addTransactionRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const transactionData = {
      user_id: 'valid_user_id',
      type: TypesTransaction.CREDIT,
      amount: 30
    }
    const promise = sut.add(transactionData)
    await expect(promise).rejects.toThrow('')
  })

  test('Should an transaction on success', async () => {
    const { sut } = makeSut()

    const transactionData = {
      user_id: 'valid_user_id',
      type: TypesTransaction.CREDIT,
      amount: 30
    }
    const transaction = await sut.add(transactionData)

    expect(transaction).toEqual({
      id: 'valid_id',
      user_id: 'valid_user_id',
      amount: 30,
      type: TypesTransaction.CREDIT
    })
  })
})

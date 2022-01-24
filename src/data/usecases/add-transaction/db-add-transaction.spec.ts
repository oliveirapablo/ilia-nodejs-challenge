import { TransactionModel, AddTransactionModel, AddTransactionRepository } from './db-add-transaction-protocols'
import { DbAddTransaction } from './db-add-transaction'

enum TypesTransaction {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT'
}

const makeAddTransactionRepository = (): AddTransactionRepository => {
  class AddTransactionRepositoryStub implements AddTransactionRepository {
    async add (accountData: AddTransactionModel): Promise<TransactionModel> {
      const fakeAccount = {
        id: 'valid_id',
        user_id: 'valid_user_id',
        amount: 30,
        type: TypesTransaction.CREDIT
      }
      return await new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddTransactionRepositoryStub()
}

interface SutTypes {
  sut: DbAddTransaction
  addAccountRepositoryStub: AddTransactionRepository
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddTransactionRepository()
  const sut = new DbAddTransaction(addAccountRepositoryStub)

  return {
    sut,
    addAccountRepositoryStub
  }
}

describe('DbAddTransaction Usecase', () => {
  test('Should call AddTransactionRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

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
})

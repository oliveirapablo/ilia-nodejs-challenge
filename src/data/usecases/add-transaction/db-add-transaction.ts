import { TransactionModel, AddTransactionRepository, AddTransaction, AddTransactionModel } from './db-add-transaction-protocols'

export class DbAddTransaction implements AddTransaction {
  private readonly addTransactionRepository: AddTransactionRepository

  constructor (addTransactionRepository: AddTransactionRepository) {
    this.addTransactionRepository = addTransactionRepository
  }

  async add (transactionData: AddTransactionModel): Promise<TransactionModel> {
    const transaction = await this.addTransactionRepository.add(transactionData)
    return transaction
  }
}

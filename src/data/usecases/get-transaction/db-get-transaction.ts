import { TransactionsModel, GetTransactionRepository, GetTransaction, GetTransactionModel } from './db-get-transaction-protocols'

export class DbGetTransaction implements GetTransaction {
  private readonly getTransactionRepository: GetTransactionRepository

  constructor (getTransactionRepository: GetTransactionRepository) {
    this.getTransactionRepository = getTransactionRepository
  }

  async find (userId?: GetTransactionModel): Promise<TransactionsModel> {
    const transaction = await this.getTransactionRepository.find(userId)
    return transaction
  }
}

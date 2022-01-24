import { BalanceTransactionModel, BalanceTransactionRepository, BalanceTransaction } from './db-balance-transaction-protocols'

export class DbBalanceTransaction implements BalanceTransaction {
  private readonly balanceTransactionRepository: BalanceTransactionRepository

  constructor (balanceTransactionRepository: BalanceTransactionRepository) {
    this.balanceTransactionRepository = balanceTransactionRepository
  }

  async balance (): Promise<BalanceTransactionModel> {
    const transaction = await this.balanceTransactionRepository.balance()
    return transaction
  }
}

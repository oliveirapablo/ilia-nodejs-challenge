import { BalanceTransactionModel } from '../../domain/models/transaction'

export interface BalanceTransactionRepository {
  balance (): Promise<BalanceTransactionModel>
}

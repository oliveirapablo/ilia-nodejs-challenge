import { BalanceTransactionModel } from '../models/transaction'

export interface BalanceTransaction {
  balance (): Promise<BalanceTransactionModel>
}

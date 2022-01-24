import { TransactionsModel } from '../models/transaction'

export interface GetTransactionModel {
  user_id?: string
}

export interface GetTransaction {
  find(user_id?: GetTransactionModel): Promise<TransactionsModel>
}

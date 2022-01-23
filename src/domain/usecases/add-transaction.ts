import { TransactionModel, TypesTransaction } from '../models/transaction'

export interface AddTransactionModel {
  user_id: string
  type: TypesTransaction
  amount: number
}

export interface AddTransaction {
  add(transaction: AddTransactionModel): Promise<TransactionModel>
}

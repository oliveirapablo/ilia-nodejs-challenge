import { TransactionModel } from '../models/transaction'

export const enum TypesTransaction {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT'
}

export interface AddTransactionModel {
  user_id: string
  type: TypesTransaction
  amount: number
}

export interface AddTransaction {
  add(transaction: AddTransactionModel): TransactionModel
}

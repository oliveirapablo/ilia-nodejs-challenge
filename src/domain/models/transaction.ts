export enum TypesTransaction {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT'
}

export interface TransactionModel {
  id: string
  user_id: string
  amount: number
  type: TypesTransaction
}

export interface TransactionsModel {
  transactions: TransactionModel[]
}

export interface BalanceTransactionModel {
  amount: number
}

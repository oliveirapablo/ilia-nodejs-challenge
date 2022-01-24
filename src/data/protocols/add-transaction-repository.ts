import { AddTransactionModel } from '../../domain/usecases/add-transaction'
import { TransactionModel } from '../../domain/models/transaction'

export interface AddTransactionRepository {
  add (transaction: AddTransactionModel): Promise<TransactionModel>
}

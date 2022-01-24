import { GetTransactionModel } from '../../domain/usecases/get-transactions'
import { TransactionsModel } from '../../domain/models/transaction'

export interface GetTransactionRepository {
  find (user_id?: GetTransactionModel): Promise<TransactionsModel>
}

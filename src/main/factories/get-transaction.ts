import { GetTransactionController } from '../../presentation/controller/wallet/get-transactions'
import { DbGetTransaction } from '../../data/usecases/get-transaction/db-get-transaction'
import { TransactionMongoRepository } from '../../infra/db/mongodb/transaction-repository/get-transaction'
export const makeGetTransaction = (): GetTransactionController => {
  const transactionMongoRepository = new TransactionMongoRepository()
  const getTransaction = new DbGetTransaction(transactionMongoRepository)
  return new GetTransactionController(getTransaction)
}

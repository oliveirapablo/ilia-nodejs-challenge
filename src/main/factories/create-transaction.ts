import { CreateTransactionController } from '../../presentation/controller/wallet/create-transaction'
import { DbAddTransaction } from '../../data/usecases/add-transaction/db-add-transaction'
import { TransactionMongoRepository } from '../../infra/db/mongodb/transaction-repository/transaction'
export const makeCreateTransaction = (): CreateTransactionController => {
  const transactionMongoRepository = new TransactionMongoRepository()
  const addTransaction = new DbAddTransaction(transactionMongoRepository)
  return new CreateTransactionController(addTransaction)
}

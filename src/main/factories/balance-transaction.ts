import { BalanceTransactionController } from '../../presentation/controller/wallet/balance-transaction'
import { DbBalanceTransaction } from '../../data/usecases/balance-transaction/db-balance-transaction'
import { BalanceTransactionMongoRepository } from '../../infra/db/mongodb/transaction-repository/balance-transaction'
export const makeBalanceTransaction = (): BalanceTransactionController => {
  const balanceTransactionMongoRepository = new BalanceTransactionMongoRepository()
  const balanceTransaction = new DbBalanceTransaction(balanceTransactionMongoRepository)
  return new BalanceTransactionController(balanceTransaction)
}

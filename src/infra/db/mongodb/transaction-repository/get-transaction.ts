import { GetTransactionRepository } from '../../../../data/protocols/get-transaction-repository'
import { GetTransactionModel, TransactionsModel } from '../../../../presentation/protocols'
import { MongoHelper } from '../helpers/mongo-helper'

export class TransactionMongoRepository implements GetTransactionRepository {
  async find (transactionData: GetTransactionModel): Promise<TransactionsModel> {
    const transactionCollection = await MongoHelper.getCollection('transactions')
    const result = await transactionCollection.find({}).toArray()
    const transactions = []
    result.forEach((transaction) => {
      transactions.push(MongoHelper.map(transaction))
    })
    return { transactions }
  }
}

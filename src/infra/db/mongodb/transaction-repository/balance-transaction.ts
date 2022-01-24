import { BalanceTransactionRepository } from '../../../../data/protocols/balance-transaction-repository'
import { BalanceTransactionModel } from '../../../../presentation/protocols'
import { MongoHelper } from '../helpers/mongo-helper'

export class BalanceTransactionMongoRepository implements BalanceTransactionRepository {
  async balance (): Promise<BalanceTransactionModel> {
    const transactionCollection = await MongoHelper.getCollection('transactions')
    const result = await transactionCollection.find({}).toArray()
    let amountSum = 0
    result.forEach((transaction) => {
      amountSum += transaction.amount
    })

    return { amount: amountSum }
  }
}

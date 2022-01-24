import { AddTransactionRepository } from '../../../../data/protocols/add-transaction-repository'
import { AddTransactionModel, TransactionModel } from '../../../../presentation/protocols'
import { MongoHelper } from '../helpers/mongo-helper'

export class TransactionMongoRepository implements AddTransactionRepository {
  async add (transactionData: AddTransactionModel): Promise<TransactionModel> {
    const transactionCollection = MongoHelper.getCollection('transactions')
    const result = await transactionCollection.insertOne(transactionData)
    return MongoHelper.map(transactionData)
  }
}

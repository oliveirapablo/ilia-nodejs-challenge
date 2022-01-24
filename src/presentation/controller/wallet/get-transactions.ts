import { HttpRequest, HttpResponse, Controller, GetTransaction } from './wallet-protocols'
import { serverError, ok } from '../../helpers/http-helper'

export class GetTransactionController implements Controller {
  private readonly getTransaction: GetTransaction
  constructor (getTransaction: GetTransaction) {
    this.getTransaction = getTransaction
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const transaction = await this.getTransaction.find()
      return ok(transaction)
    } catch (error) {
      return serverError()
    }
  }
}

import { HttpRequest, HttpResponse, Controller, BalanceTransaction } from './wallet-protocols'
import { serverError, ok } from '../../helpers/http-helper'

export class BalanceTransactionController implements Controller {
  private readonly balanceTransaction: BalanceTransaction
  constructor (balanceTransaction: BalanceTransaction) {
    this.balanceTransaction = balanceTransaction
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { amount } = await this.balanceTransaction.balance()
      return ok(amount)
    } catch (error) {
      return serverError()
    }
  }
}

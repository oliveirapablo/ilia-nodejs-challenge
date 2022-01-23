import { HttpRequest, HttpResponse, Controller, TypesTransaction, AddTransaction } from './wallet-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

export class CreateTransactionController implements Controller {
  private readonly addTransaction: AddTransaction
  constructor (addTransaction: AddTransaction) {
    this.addTransaction = addTransaction
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['user_id', 'type', 'amount']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { user_id, type, amount } = httpRequest.body

      if (!Object.values(TypesTransaction).includes(type)) {
        return badRequest(new InvalidParamError('type'))
      }
      await this.addTransaction.add({
        user_id,
        type,
        amount
      })
      return ok({ message: 'ok' })
    } catch (error) {
      return serverError()
    }
  }
}

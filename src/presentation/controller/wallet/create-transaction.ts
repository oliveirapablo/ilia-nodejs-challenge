import { HttpRequest, HttpResponse, Controller, TypesTransaction } from './wallet-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

export class CreateTransactionController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['user_id', 'type', 'amount']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    // const { user_id, type, amount } = httpRequest.body

    // const validTypesTransaction = ['CREDIT', 'DEBIT']
    return ok({ message: 'ok' })
  }
}

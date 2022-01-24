import { Router } from 'express'
import { makeCreateTransaction } from '../factories/create-transaction'
import { adaptRoute } from '../adapters/create-transaction-route'

export default (router: Router): void => {
  router.post('/transactions', adaptRoute(makeCreateTransaction()))
}

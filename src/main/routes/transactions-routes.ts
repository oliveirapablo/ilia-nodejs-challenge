import { Router } from 'express'
import { makeCreateTransaction } from '../factories/create-transaction'
import { makeGetTransaction } from '../factories/get-transaction'
import { makeBalanceTransaction } from '../factories/balance-transaction'
import { adaptRoute } from '../adapters/create-transaction-route'

export default (router: Router): void => {
  router.post('/transactions', adaptRoute(makeCreateTransaction()))
  router.get('/transactions', adaptRoute(makeGetTransaction()))
  router.get('/balance', adaptRoute(makeBalanceTransaction()))
}

import { Router } from 'express'
import { getLast, search, cancel, confirm, complete } from './controllers'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { schema } from '../../models/game'

const router = new Router()

const {
  option
} = schema.tree

router.get('/',
  token({ required: true }),
  getLast)

router.get('/search',
  token({ required: true }),
  search)

router.get('/cancel',
  token({ required: true }),
  cancel)

router.get('/confirm',
  token({ required: true }),
  confirm)

router.post('/complete',
  token({ required: true }),
  body({ option }),
  complete)

export default router

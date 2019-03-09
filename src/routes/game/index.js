import { Router } from 'express'
import { getLast, search, cancel, confirm } from './controllers'
import { token } from '../../services/passport'

const router = new Router()

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


export default router

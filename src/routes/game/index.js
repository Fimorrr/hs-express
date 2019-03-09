import { Router } from 'express'
import { search, cancel } from './controllers'
import { token } from '../../services/passport'

const router = new Router()

router.get('/search',
  token({ required: true }),
  search)

router.get('/cancel',
  token({ required: true }),
  cancel)


export default router

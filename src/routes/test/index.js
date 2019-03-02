import { Router } from 'express'
import { getTest } from './controllers'
import { token } from '../../services/passport'

const router = new Router()

router.get('/',
  token({ required: false }),
  getTest)


export default router

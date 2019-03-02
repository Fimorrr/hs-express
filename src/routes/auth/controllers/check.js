import { sign } from '../../../services/jwt'
import User from '../../../models/user'

export default async ({ bodymen: { body: { name } } }, res, next) => {
  try {
    // ищем юзера по имени
    let user = await User.findUserByName(name)

    // если юзер не найден, отправляем false
    if (!user) {
      return res.sendError(404, 'User not found')
    }

    return res.sendSuccess()
  } catch (err) {
    return next(err)
  }
}

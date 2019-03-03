import { sign } from '../../../services/jwt'
import User from '../../../models/user'

export default async ({ bodymen: { body: { name } } }, res, next) => {
  try {
    // ищем юзера по имени
    let user = await User.findUserByName(name)

    // если юзер не найден, отправляем false
    if (!user) {
      let battleTag = name.split('#');

      if (battleTag.length !== 2 || battleTag[0].length < 3 || battleTag[0].length > 12 || !/^\d+$/.test(battleTag[1])) {
        return res.sendError(400, 'Wrong battle tag')
      }

      return res.sendError(404, 'User not found')
    }

    return res.sendSuccess()
  } catch (err) {
    return next(err)
  }
}

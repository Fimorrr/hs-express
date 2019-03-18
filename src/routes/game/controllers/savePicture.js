import User from '../../../models/user'
import Game from '../../../models/game'

export default async ({ user, file }, res, next) => {
  try {
    if (file == null) {
      return res.sendError(404, 'Wrong file format')
    }

    let lastGame = await getLastGame(user);
    if (!lastGame) {
      return res.sendError(404, 'There no game');
    } 

    //Здесь добавить логику добавления имени файла в базу

    return res.sendSuccess()
  } catch (err) {
    return next(err)
  }
}

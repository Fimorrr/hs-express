import User from '../../../models/user'
import Game from '../../../models/game'
import { getLastGame, isCreator } from '../../../middlewares'

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
    const creator = isCreator(user, lastGame);
    if (creator == null) {
      return res.sendError(404, 'Wrong game');
    }
    else if (creator) {
      await lastGame.creatorPictures.push(file.filename);
    }
    else {
      await lastGame.partnerPictures.push(file.filename);
    }

    await lastGame.save();

    return res.sendSuccess()
  } catch (err) {
    return next(err)
  }
}

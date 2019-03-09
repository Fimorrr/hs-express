import User from '../../../models/user'
import Game from '../../../models/game'

export default async ({ user }, res, next) => {
  try {
    const userGames = user.games;

    if (userGames.length > 0) {
      let lastGame = userGames[userGames.length - 1];
      lastGame = await Game.findOne(lastGame);

      if (!lastGame) {
        return res.sendError(404, 'Nothing to cancel')
      }

      if (lastGame && lastGame.status >= 5) { //Проверяем статус
        return res.sendError(404, 'Nothing to cancel')
      }

      await lastGame.set({ status: 5 }); //Меняем статус на cancelled
      await lastGame.save();

      return res.sendSuccess();
    } 

    return res.sendError(404, 'Nothing to cancel')
  } catch (err) {
      return next(err)
  }
}

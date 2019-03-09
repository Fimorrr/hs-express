import User from '../../../models/user'
import Game from '../../../models/game'

export default async ({ user }, res, next) => {
  try {
    let lastGame = user.games[user.games.length - 1];
    lastGame = await Game.findOne(lastGame);

    await lastGame.set({ status: 5 }); //Меняем статус на cancelled
    await lastGame.save();

    return res.sendSuccess({ lastGame })
  } catch (err) {
      return next(err)
  }
}

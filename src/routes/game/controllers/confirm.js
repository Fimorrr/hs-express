import User from '../../../models/user'
import Game from '../../../models/game'

export default async ({ user }, res, next) => {
  try {
    const userGames = user.games;

    if (userGames.length > 0) {
      let lastGame = userGames[userGames.length - 1];
      lastGame = await Game.findOne(lastGame);

      if (!lastGame) {
        return res.sendError(404, 'Nothing to confirm')
      }

      if (lastGame && lastGame.status !== 1) { //Проверяем статус
        return res.sendError(404, 'Nothing to confirm')
      }

      if (user.id == lastGame.creator && !lastGame.creatorSubmit) {
        await lastGame.set({ creatorSubmit: true }); //Подтверждаем игру
        if (lastGame.partnerSubmit) { //Если другой уже подтвердил, то меняем статус Game
          await lastGame.set({ status: 2 });
        }
      }
      else if (user.id == lastGame.partner && !lastGame.partnerSubmit) { //Аналогично со стороны другого игрока
        await lastGame.set({ partnerSubmit: true }); 
        if (lastGame.creatorSubmit) {
          await lastGame.set({ status: 2 });
        }
      }
      else {
        return res.sendError(404, 'Nothing to confirm')
      }

      await lastGame.save();
      return res.sendSuccess();
    } 

    return res.sendError(404, 'Nothing to confirm')
  } catch (err) {
      return next(err)
  }
}

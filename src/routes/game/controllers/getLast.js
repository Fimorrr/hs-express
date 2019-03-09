import User from '../../../models/user'
import Game from '../../../models/game'

export default async ({ user }, res, next) => {
  try {
    const userGames = user.games;

    if (userGames.length > 0) {
      let lastGame = userGames[userGames.length - 1];
      lastGame = await Game.findOne(lastGame);

      if (!lastGame) {
        res.sendSuccess({ game: { status: -1 } });
      }
      
      let time = 0; //Время, прошедшее с последнего изменения статуса

      if (lastGame.status < 2) { //показывать время только при статусах Search и Waiting
        time = (Date.now() - lastGame.changedAt.getTime()) / 1000;
      }

      return res.sendSuccess({ game: { 
        status: lastGame.status,
        time
      } });
    } 

    return res.sendSuccess({ game: { status: -1 } });
  } catch (err) {
      return next(err)
  }
}

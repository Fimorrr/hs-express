import User from '../../../models/user'
import Game from '../../../models/game'

const getSubmit = (game, user) => {
  if (game.creator === user.id) {
    if (game.status == 1 && game.creatorSubmit) { //высылаем submit при подтверждении игры
      return true;
    } else if (game.status == 2 && game.creatorOption >= 0) {
      return true;
    }
  }
  else if (game.partner === user.id) {
    if (game.status == 1 && game.partnerSubmit) { //высылаем submit при подтверждении игры
      return true;
    } else if (game.status == 2 && game.partnerOption >= 0) {
      return true;
    }
  }
}

export default async ({ user }, res, next) => {
  try {
    const userGames = user.games;

    if (userGames.length > 0) {
      let lastGame = userGames[userGames.length - 1];
      lastGame = await Game.findOne(lastGame);

      if (!lastGame) {
        res.sendSuccess({ game: { status: -1 } });
      }

      let time; //Время, прошедшее с последнего изменения статуса

      if (lastGame.status < 2) { //показывать время только при статусах Search и Waiting
        time = (Date.now() - lastGame.changedAt.getTime()) / 1000;
      }

      return res.sendSuccess({ game: { 
        status: lastGame.status,
        submit: getSubmit(lastGame, user),
        time,
      } });
    } 

    return res.sendSuccess({ game: { status: -1 } });
  } catch (err) {
      return next(err)
  }
}

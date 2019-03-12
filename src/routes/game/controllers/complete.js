import User from '../../../models/user'
import Game from '../../../models/game'

const setStatus = async (option1, option2, game) => {
  if (option1 == 0 && option2 == 0) { //Все отлично у обоих игроков
    await game.set({ status: 4 });
  }
  else if (option1 == 2 || option2 == 2) {
    await game.set({ status: 3 });
  }

  await game.save();
  console.log(game);
}

export default async ({ user, bodymen: { body: { option } } }, res, next) => {
  try {
    if (option < 0 || option > 2) {
      return res.sendError(404, 'Wrong option');
    }
    const userGames = user.games;

    if (userGames.length > 0) {
      let lastGame = userGames[userGames.length - 1];
      lastGame = await Game.findOne(lastGame);

      if (!lastGame) {
        return res.sendError(404, 'Nothing to complete')
      }

      if (lastGame && lastGame.status !== 2) { //Проверяем статус
        return res.sendError(404, 'Nothing to complete')
      }

      //console.log(user);
      //console.log(lastGame);
      if (user.id == lastGame.creator && lastGame.creatorOption === -1) {
        await lastGame.set({ creatorOption: option }); //меняем опцию
        await setStatus(lastGame.partnerOption, option, lastGame); //меняем статус
      }
      else if (user.id == lastGame.partner && lastGame.partnerOption === -1) { //Аналогично со стороны другого игрока
        await lastGame.set({ partnerOption: option }); 
        await setStatus(lastGame.creatorOption, option, lastGame);
      }
      else {
        return res.sendError(404, 'Nothing to complete')
      }

      await lastGame.save();
      return res.sendSuccess();
    } 

    return res.sendError(404, 'Nothing to complete')
  } catch (err) {
      return next(err)
  }
}

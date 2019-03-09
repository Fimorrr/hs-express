import User from '../../../models/user'
import Game from '../../../models/game'

export default async ({ user }, res, next) => {
  try {
    const userGames = user.games;

    if (userGames.length > 0) {
      let lastGame = userGames[userGames.length - 1];
      lastGame = await Game.findOne(lastGame);

      if (lastGame && lastGame.status < 4) { //Проверяем, находится ли игрок в созданной игре
        return res.sendError(400, 'Already in game')
      }
    } 

    let game = await Game.findGame();

    if (!game) { //Если игры со статусом 0 нет, то создаем новую
      game = await Game.create({ creator: user.id });
    }
    else { //Если есть, то добавляемся как partner и меняем статус
      await game.set({ partner: user.id, status: 1, changedAt: Date.now() });
      await game.save();
    }

    await user.games.push(game); //Добавляем пользователю ссылку на игру
    await user.save();

    return res.sendSuccess()
  } catch (err) {
      return next(err)
  }
}

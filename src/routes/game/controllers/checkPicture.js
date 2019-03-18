import User from '../../../models/user'
import Game from '../../../models/game'
import getLastGame from '../../../middlewares/getLastGame'

export default async ({ user }, res, next) => {
  try {
    //Здесь проверяем, находится ли игра в стадии спора и можно ли записать в нее еще одну картинку
    let lastGame = await getLastGame(user);
    if (!lastGame) {
      return res.sendError(404, 'There no game');
    } 

    if (lastGame && lastGame.status !== 3) { //Проверяем статус
      return res.sendError(404, 'Wrong status');
    }

    //Далее проверяем, не более пяти файлов на игрока
    
    return next()
  } catch (err) {
    return next(err)
  }
}

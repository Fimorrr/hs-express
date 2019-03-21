import User from '../../../models/user'
import Game from '../../../models/game'
import path from 'path'
import { getLastGame, isCreator } from '../../../middlewares'

export default async ({ user, params }, res, next) => {
  try {
    //Первым делом проверяем параметр
    let number = params.number;
    if (number == null || !/^\d+$/.test(number) || number > 4 || number < 0) {
      return res.sendError(404, 'Wrong parameter');
    }

    //Здесь проверяем, находится ли игра в стадии спора
    let lastGame = await getLastGame(user);
    if (!lastGame) {
      return res.sendError(404, 'There no game');
    } 

    if (lastGame && lastGame.status !== 3) { //Проверяем статус
      return res.sendError(404, 'Wrong status');
    }

    //Далее проверяем наличие картинки под параметр
    const creator = isCreator(user, lastGame);
    if (creator == null) {
      return res.sendError(404, 'Wrong game');
    }
    else if (creator && lastGame.creatorPictures[number] != null) {
      return res.sendFile(path.resolve(__dirname + '/../../../public/uploads/' + lastGame.creatorPictures[number]));
    }
    else if (!creator && lastGame.partnerPictures[number] != null) {
      return res.sendFile(path.resolve(__dirname + '/../../../public/uploads/' + lastGame.partnerPictures[number]));
    }
    
    return res.sendError(404, 'There is no picture');
  } catch (err) {
    return next(err)
  }
}

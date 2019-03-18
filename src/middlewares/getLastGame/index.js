import Game from '../../models/game'

export default async (user) => {
  const userGames = user.games;

  if (userGames.length > 0) {
    let lastGame = userGames[userGames.length - 1];
    lastGame = await Game.findOne(lastGame);

    return lastGame;
  }

  return null;
}

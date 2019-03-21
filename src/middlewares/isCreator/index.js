import Game from '../../models/game'

export default (user, game) => {
  if (user.id == game.creator) {
    return true;
  }
  else if (user.id == game.partner) { 
    return false;
  }

  return null;
}

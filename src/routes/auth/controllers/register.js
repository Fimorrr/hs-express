import User from '../../../models/user'

export default async ({ bodymen: { body: { email, name, password } } }, res, next) => {
  try {
    // если прислали пустое поле с именем, дропаем
    if (!name || !email || !password) {
      return res.sendError(400, 'Name field is empty')
    }

    let battleTag = name.split('#');

    if (battleTag.length !== 2 || battleTag[0].length < 3 || battleTag[0].length > 12 || !/^\d+$/.test(battleTag[1])) {
      return res.sendError(400, 'Wrong battle tag')
    }

    // ищем юзера по мылу
    let user = await User.findUserByEmail(email)

    // если такой email уже зарегистрирован, дропаем
    if (user) {
      return res.sendError(403, 'User is already registered')
    }

    user = await User.findUserByName(name)

    if (user) {
      return res.sendError(403, 'User is already registered')
    }

    // создаем юзера
    await User.create({ email, password, name })

    // отсылаем успех
    return res.sendSuccess()
  } catch (err) {
    return next(err)
  }
}

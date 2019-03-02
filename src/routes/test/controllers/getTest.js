export default async (req, res, next) => {
  try {
    return res.sendSuccess({ test: "test123" })
  } catch (err) {
      return next(err)
  }
}

export async function registerUser(req, res, next) {
  try {
    throw new Error("Password is weak");
  } catch (err) {
    err.status = 400
    next(err)
  }
}

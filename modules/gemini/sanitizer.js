module.exports = (req, res, next) => {
  let { body } = req;

  if (body.email) {
    body.email = body.email.trim().toLowerCase();
  }

  next();
};

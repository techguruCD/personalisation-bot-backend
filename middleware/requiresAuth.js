const requiresAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({
      message: { error: "Unauthorized" }
    })
  }
  next()
}

module.exports = requiresAuth
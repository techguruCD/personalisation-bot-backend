const requiresAdmin = (req, res, next) => {
    if (req.user?.role !== 'ADMIN') {
      return res.status(401).send({
        message: { error: "Unauthorized" }
      })
    }
    next()
  }
  
  module.exports = requiresAdmin
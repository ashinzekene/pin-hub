function isUser(id) {
  return (req, res, next) => {
    req.user._id === id ?
    next() :
    res.status(401).json({ err: "Why would you even try that, thief!" })
  }
}

module.exports = {
  isUser,
}
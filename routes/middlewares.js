function adminCategory(req, res, next) {
  req.user._id === req.category.user ?
    next() :
    res.status(401).json({ err: "Why would you even try that, thief!" })
}

function adminPin(req, res, next) {
  req.user._id === req.pin.user ?
    next() :
    res.status(401).json({ err: "Why would you even try that, thief!" })
}

module.exports = {
  adminCategory,
  adminPin,
}
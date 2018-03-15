const express = require('express')
const rand = require('randomstring')
const Pins = require('../models/pins')
const { adminPin } = require('./middlewares')
const router = express.Router()

router.param('pin', (req, res, next, id) => {
  Pins.findById(id, (err, pin) => {
    if (err || !pin) {
      console.log(pin, id);
      res.status(404).json({ error: 'pin does not exist' });
      return;
    }
    req.pin = pin;
    next();
  });
});


router.get('/', function (req, res) {
  pageNo = parseInt(req.query.page) || 1
  skip = 20 * (pageNo - 1)
  Pins.find().limit(20).sort({ 'used': '-1' }).skip(skip).exec(function (err, pins) {
    Pins.count(function (err, total) {
      Pins.find({ used: true }).count(function (err, usedpins) {
        if (err) console.log(err)
        res.render("user/pins", { 
          user: req.user,
          usedpins,
          pins,
        })
      })
    })
  })
})

router.get("pins", (req, res) => {
  Pins.find({ user: req.user._id}, (err, pins) => {
    res.json(pins)
  })
})

router.get("pins/:pin", adminPin, (req, res) => {
  res.json(res.pin)
})

router.post("pins/create", (req, res) => {
  const { name, description, photoUrl, subscriptions } = req.body
  if (!name || !description) {
    res.json({ err: "Incomplete details" })
  }
  Pins.create({ user: req.user._id ,name, description, subscriptions, photoUrl }, (err, pin) => {
    res.json(pin)
  })
})

router.post("pins/:pin/edit", adminPin, (req, res) => {
  const { name, description, photoUrl, subscriptions, id } = req.body
  Pins.findByIdAndUpdate(id, { name, description, subscriptions, photoUrl }, (err, pin) => {
    res.json(pin)
  })
})

router.post("pins/:pin/delete", adminPin, (req, res) => {
  Pins.findOneAndRemove(id, (err, pins) => {
    res.json(pins)
  })
})

module.exports = router
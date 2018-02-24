const express = require('express')
// const rand = require('randomstring')
// const Pins =require('../models/pins')
const router = express.Router()

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

module.exports = router
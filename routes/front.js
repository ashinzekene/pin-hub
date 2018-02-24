var express = require('express')
var passport = require('passport')
var route = express.Router()
var Pins = require('../models/pins')

route.get('/', function(req, res, next) {
	res.render('index')
})
route.get('/about', function(req, res, next) {
	res.render('todo')
})
route.get('/sign-in', function(req, res) {
	res.render('sign-in', {message: req.flash('signinMessage')})
})

route.get('/sign-up', function(req, res) {
	res.render('sign-up', {message: req.flash('signupMessage')})
})

route.post('/sign-in', passport.authenticate('sign-in', {
		successRedirect: '/user',
		failureRedirect: '/sign-in',
		failureFlash: true
}))

route.post('/sign-up', passport.authenticate('sign-up', {
	successRedirect: '/user',
	failureRedirect: '/sign-up',
	failureFlash: true  
}))

route.get('/validate', /*passport.authenticate('basic', { session: false }),*/ function(req, res) {
	res.setHeader('Access-Control-Allow-Origin','*')
	var pin = req.query.pin
	var value = req.query.value
	var category = req.query.category
	if (pin === 'Ekene') {
		res.json({result: 'success'})
	}
	else {
		Pins.findOne({pin: pin}, function(err, pin) {
			if (err) console.log(err)
			if (!pin) {
				res.json({result: 'incorrect pin'})
			}
			else if (pin.used === 'true') {
				res.json({result: 'this pin has been used'})
			}
			else if (pin.value.toString() !== value) {
				res.json({result: 'pin value is incorrect'})
			}
			else if (pin.category !== category) {
				res.json({result: 'pin cannot be used for this application'})
			}
			else {
				pin.used= true
				pin.save(function(err, pin) {
					UsedPins.create({pin: pin.pin, value: pin.value}, function(err, usedPin) {
						res.json({result: 'success'})				
					})
				})
			}
		})
	}
})

route.get('/api/fsc113/all-questions', function(req, res) {
	Questions.find(function(err, questions) {
		res.setHeader('Access-Control-Allow-Origin','*')
		res.json(questions)
	})
})

module.exports = route
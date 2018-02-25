const express = require('express')
const router = express.Router()
const User = require('../models/users')

router.get('/', function (req, res) {
	res.render('user/dashboard', { user: req.user })
})
router.get('/pins',function (req, res) {
	res.render('user/pins')
})
router.get('/categories',function (req, res) {
	res.render('user/categories')
})
router.use('pins', require('./pin'))
router.use('categories', require('./category'))

// route.post('/delete/:id', function(req, res) {
// 	obj = {'_id': req.params.id}
// 	console.log(req.params.id)
// 	Pins.remove(obj, function(err,pins) {
// 		if (err) console.log(err)
// 		res.redirect('/user')	
// 	})
// })
// route.get('/delete/:id', function(req, res) {
// 	obj = {'_id': req.params.id}
// 	console.log(req.params.id)
// 	Pins.remove(obj, function(err,pins) {
// 		if (err) console.log(err)
// 		res.redirect('/user')	
// 	})
// })
// route.get('/delete-used', function(req, res) {
// 	Pins.remove({used : true}, function(err,pins) {
// 		if (err) console.log(err)
// 		res.send(pins)
// 	})
// })

// route.post('/generate', function(req, res) {
// 	0 < req.body.number < 100 ? no = req.body.number  : no = 20
// 	let val = req.body.value
// 	let cat = req.body.category
// 	for(let x = 0; x < no; x++) {
// 		let randPin = rand.generate(10)
// 		Pins.create({pin: randPin, user: 'admin', value: val, category: cat}, function(err, pins) {
// 			if (err) console.log(err)
// 		})
// 		GeneratedPins.create({pin: randPin, value: val}, function(err, generatedPins) {
// 			if (err) console.log(err)
// 		})
// 	}
// 	res.redirect('/user')
// })


// route.post('/used-multiple', function(req, res) {
// 	const marked = req.body.marked
// 	if (marked) {
// 		for(let x of marked) {
// 			Pins.findByIdAndUpdate(x, {used: true}, function(err, pins){
// 				if (err) console.log(err)
// 			})
// 		}
// 		res.redirect('/user')
// 	} else {
// 		res.redirect('/user')
// 	}
// })

// route.post('/unused-multiple', function(req, res) {
// 	const marked = req.body.marked
// 	if (marked) {
// 		for(let x of marked) {
// 			Pins.findByIdAndUpdate(x, {used: false}, function(err, pins){
// 				if (err) console.log(err)
// 			})
// 		}
// 		res.redirect('/user')
// 	} else {
// 		res.redirect('/user')
// 	}
// })

// route.post('/delete-multiple', function(req, res) {
// 	const marked = req.body.marked
// 	if (marked) {
// 		for(let x of marked) {
// 			Pins.remove({_id: x}, function(err, pins){
// 				if (err) console.log('Error occured for ', x)
// 			})
// 		}
// 		res.redirect('/user')
// 	} else {
// 		res.redirect('/user')
// 	}
// })

module.exports = router
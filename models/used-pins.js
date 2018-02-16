var mongoose = require('mongoose')

usedPinSchema = mongoose.Schema({
	pin : {
		type: String,
		required: true
	},
	value : {
		type: Number,
		required: true
	},
	date : {
		type: Date
	}
})

var UsedPins = module.exports = mongoose.model('UsedPins', usedPinSchema)
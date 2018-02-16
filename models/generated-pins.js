var mongoose = require('mongoose')

generatedPinSchema = mongoose.Schema({
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

var GeneratedPins = module.exports = mongoose.model('generatedPins', generatedPinSchema)
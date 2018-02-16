var mongoose = require('mongoose')

var pinSchema = mongoose.Schema({
	pin : {
		type: String,
		required: true,
		unique: true
	},
	user : {
    type : String,
    ref : 'users',
    required: true,
    select: false
  },	
  value: {
		type: Number,
    required: true,
	},
  category: String,
	used : {
		type: String,
		default: false
	},
	expiry: {
		type: Date,
	},
	date : {
		type: Date,
		default: Date.now()
	}
})

var Pin = module.exports = mongoose.model('pin', pinSchema)
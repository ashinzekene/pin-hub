var mongoose = require('mongoose')

var pinSchema = mongoose.Schema({
	pin : {
		type: String,
		required: true,
		unique: true
	},
	user : {
    type : String,
    lowercase : true,
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
	date : {
		type: Date,
		default: Date.now()
	}
})

var Pin = module.exports = mongoose.model('pin', pinSchema)
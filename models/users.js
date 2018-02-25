const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const { Schema } = mongoose
const subscriptions = [
	"free",
	"basic",
	"extended",
]

const userSchema = new Schema({
	username : String,
	firstName: String,
	lastName: String,
	photoUrl: String,
	subscriptionType: {
		type: String,
		enum:  subscriptions,
		default: subscriptions[0],
	},
	email : {
		type: String,
	},
	password : {
		type: String,
		minlength: 6,
		select: false,
	}
})

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password)
}
userSchema.methods.validatePassword = function(password) {
	return bcrypt.compareSync(password, this.password)
}

const User = module.exports = mongoose.model('user', userSchema)

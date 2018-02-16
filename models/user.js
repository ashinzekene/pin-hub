var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var userSchema = mongoose.Schema({
	username : String,
	email : {
		type: String,
		required: false
	},
	password : String
})

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password)
}
userSchema.methods.validatePassword = function(password) {
	return bcrypt.compareSync(password, this.password)
}

var User = module.exports = mongoose.model('user', userSchema)

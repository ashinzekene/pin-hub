const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const { Schema } = mongoose

const subscriptionSchema = new Schema({
	title: String,
	description: String,
	price: String
})

const categorySchema = new Schema({
	name: String,
	description: String,
	photoUrl: String,
	user : {
    type : String,
    ref : 'users',
    required: true,
  },
	subscriptions: [subscriptionSchema]
})

const category = module.exports = mongoose.model('category', categorySchema)

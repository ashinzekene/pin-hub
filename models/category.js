const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const { Schema } = mongoose

const subscriptionSchema = new Schema({
	title: String,
	description: String,
	price: Number
})

const categorySchema = new Schema({
	name: String,
	description: String,
	validity: String,
	photoUrl: String,
	subscriptionType: [subscriptionSchema]
})

const category = module.exports = mongoose.model('category', categorySchema)

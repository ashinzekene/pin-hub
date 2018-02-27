var mongoose = require("mongoose")

var questionSchema = mongoose.Schema({
  question: String,
  a : String,
  b : String,
  c : String,
  d : String,
  e : String,
  answer : String,
})

var questions = module.exports = mongoose.model('fsc113pqs', questionSchema)
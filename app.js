var express =  require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var flash = require('connect-flash')
var favicon = require('express-favicon')
var logger = require("morgan")
var passport = require("passport")

var init = require('./logic/passport-init')
var User = require('./models/user')
var app = express()
var frontEnd = require('./routes/front')
var user = require('./routes/user')
require('dotenv').config()
var port = process.env.PORT || 5500

mongoose.promise = Promise;
init(passport, app)

let mongoUrl = process.env.ENV === 'dev' ? 'mongodb://127.0.0.1/pin-hub' : process.env.DB_URL

mongoose.connect(mongoUrl, { useMongoClient: true }, function(err) {
	if (err) return console.log("Error in DB connection")
	console.log("DB:", mongoUrl)
})
function isAuthenticated(req, res, next) {
	if(req.isAuthenticated()) return next()
	return res.redirect('/')
}

app.use(function(req, res, next) {
	console.log(`${req.method}: ${req.url}`)
	next()
})
app.use(session({secret: 'ekeneOwnsPinhub'}))
app.use(flash())
app.use("/assets", express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'ejs')

app.use('/', frontEnd)
app.use('/user', user)
app.use((err, req, res, next) => {
	console.log(err)
	res.render('error')
})

app.listen(port, function(err) {
	if (err) console.log(err)
	console.log("PORT:", port)
})


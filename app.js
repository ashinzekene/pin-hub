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
var backEnd = require('./routes/back')
require('dotenv').config()
var port = process.env.PORT || 5500

mongoose.promise = Promise;
init(passport, app)

// mongoose.connect("mongodb://127.0.0.1/pin-hub")
mongoose.connect(`mongodb://ekonash:pinpinpin@ds023704.mlab.com:23704/pin-hub`, function(err) {
	mongoose.connect(`mongodb://127.0.0.1/pin-hub`)
})
function isAuthenticated(req, res, next) {
	if(req.isAuthenticated()) return next()
	return res.redirect('/')
}
app.use(session({secret: 'ekeneOwnsPinhub'}))
app.use(flash())
app.use("/assets", express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'ejs')
app.use('/user', isAuthenticated, backEnd)
app.use('/', frontEnd)
app.listen(port, function(err) {
	if (err) console.log(err)
	console.log("Shit is going down on port ", port)
})

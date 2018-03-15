const express =  require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const favicon = require('express-favicon')
const logger = require("morgan")
const passport = require("passport")
const pin = require('./routes/pin')
const category = require('./routes/category')
const init = require('./logic/passport-init')
const frontEnd = require('./routes/front')
const user = require("./routes/user")
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5500

mongoose.promise = require('bluebird');
init(passport, app)

let mongoUrl = process.env.ENV === 'dev' ? 'mongodb://127.0.0.1/pin-hub' : process.env.DB_URL

mongoose.connect(mongoUrl, function(err) {
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
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'ejs')

app.use('/', frontEnd)
app.use('/user', isAuthenticated, user)
app.use('pins', isAuthenticated, pin)
app.use('/categories', isAuthenticated, category)
app.use((err, req, res, next) => {
	console.log(err)
	res.render('error')
})

app.listen(port, function(err) {
	if (err) console.log(err)
	console.log("PORT:", port)
})


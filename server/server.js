if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require("express-session")
const cors = require("cors");
const {verifyUser, userSerializer, userDeserializer} = require("./utlils/verify")

// Setup middleware
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.enable('trust proxy')

var sess = { 
	secret: process.env.SESSION_SECRET,
	resave: false, 
	saveUninitialized: false, 
	cookie: { secure: 'auto' }
}
if (process.env.NODE_ENV === 'production') {
	sess.cookie.sameSite = 'none'
}
app.use(session(sess))

app.use(passport.initialize())
app.use(passport.session())

// Setup passport
passport.use(new LocalStrategy(verifyUser))

passport.serializeUser(userSerializer)

passport.deserializeUser(userDeserializer)

// Setup mongoose
// mongoose.connect(process.env.DATABASE_URL)
// const mongoDB = mongoose.connection
// mongoDB.on('error', error => console.log(error))
// mongoDB.once('open', () => console.log('Connected to Mongoose'))

// Enable CORS
if (process.env.NODE_ENV === 'production') {
	const corsOptions ={
	   origin:'https://studentdash.herokuapp.com',
	   credentials: true,
	   optionSuccessStatus:200
	}
	app.use(cors(corsOptions))
	console.log('Production CORS Set')
}
else {
	const corsOptions ={
	   origin:['http://localhost:3000'],
	   credentials: true,
	   optionSuccessStatus:200
	}
	app.use(cors(corsOptions))
	console.log('Development CORS Set')
}

app.use('/', require('./routes/index'));


var port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log("Server running on port " + port)
})

// mongoDB.close();
// sqlDB.end();
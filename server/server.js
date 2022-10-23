if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require("./models/user")
const LocalStrategy = require('passport-local').Strategy
const session = require("express-session")
const cors = require("cors");
const mysql = require('mysql');

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
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Setup mongoose
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Mongoose'))

// mysql connection
const con = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
});
con.connect(function(err) {
	if (err) throw err;
	console.log("Connected to MySQL!");
});

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
	   origin:'http://localhost:3000',
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

db.close();
con.end();
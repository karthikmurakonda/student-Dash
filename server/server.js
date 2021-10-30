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

app.post("/register", (req, res) => {
	var username = req.body.username
	var password = req.body.password
	console.log(username, password);
	User.register(new User({ username: username }), password, (err, user) => {
		if (err) {
			console.log(err);
			return res.status(401).send(err);
		}

		passport.authenticate("local")(req, res, () => {
			res.status(200);
		});
	});
});

app.post("/login", passport.authenticate("local"), (req, res) => {
	res.send({user: req.user.username}).status(200)
})

app.get("/login", passport.authenticate("session"), (req, res) => {
	if (req.isAuthenticated()) {
		res.send({isAuth: true, user: req.user.username}).status(200)
	}
	else {
		res.send({isAuth: false}).status(200)
	}
})

app.post("/logout", function (req, res) {
	req.logout()
	res.sendStatus(200)
});

var port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log("Server running on port " + port)
})
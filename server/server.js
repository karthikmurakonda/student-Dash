if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

<<<<<<< Updated upstream
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var	LocalStrategy = require('passport-local').Strategy;
var passportLocalMongoose = require("passport-local-mongoose");
var session = require("express-session");
var bodyParser = require("body-parser");
const path = require("path");
=======
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require("./models/user")
const LocalStrategy = require('passport-local').Strategy
const session = require("express-session")
const cors = require("cors");
>>>>>>> Stashed changes

// Setup express
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

// Setup passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

<<<<<<< Updated upstream
=======
// Setup mongoose
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Mongoose'))

// Enable CORS
if (process.env.NODE_ENV === 'production') {
	const corsOptions ={
	   origin:'https://studentdash-server.herokuapp.com/',
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

>>>>>>> Stashed changes
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
	res.status(200).send({user: req.user.username});
})

app.get("/logout", function (req, res) {
	req.logout();
	res.redirect("/");
});

var port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log("Server running on port " + port);
})
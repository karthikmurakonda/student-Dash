if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var	LocalStrategy = require('passport-local').Strategy;
var passportLocalMongoose = require("passport-local-mongoose");
var session = require("express-session");
var bodyParser = require("body-parser");
const path = require("path");

var User = require("./models/user");

var app = express();

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

var port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log("Server running on port " + port);
})
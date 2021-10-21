var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;
var session = require("express-session"),
    bodyParser = require("body-parser");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");

var app = express();
mongoose.connect("mongodb://localhost/sslproject");

app.use(express.static("public"));
app.use(session({ secret: "ssl2021", resave: false, saveUninitialized: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post("/register", (req, res) => {
	var username = req.body.username
	var password = req.body.password
	User.register(new User({ username: username }), password, (err, user) => {
		if (err) {
			console.log(err);
			return res.send("Error");
		}

		passport.authenticate("local")(req, res, () => {
			res.send("Success")
		});
	});
});

app.post("/login", passport.authenticate("local"), (req, res) => {
	res.send("Success", 200)
})

var port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log("Server running on port " + port);
})
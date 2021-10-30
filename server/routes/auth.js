const authRouter = require('express').Router();
const passport = require('passport');
const User = require('../models/user');

authRouter.post("/register", (req, res) => {
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


authRouter.post("/login", passport.authenticate("local"), (req, res) => {
	res.status(200).send({user: req.user.username});
})

authRouter.get("/login", passport.authenticate("session"), (req, res) => {
	if (req.isAuthenticated()) {
		res.send({isAuth: true, user: req.user.username}).status(200)
	}
	else {
		res.send({isAuth: false}).status(200)
	}
})


authRouter.get("/logout", passport.authenticate("session"), function (req, res) {
	req.logout();
	res.sendStatus(204);
});

module.exports = authRouter;
const authRouter = require('express').Router();
const passport = require('passport');
const User = require('../models/user');

authRouter.post("/register", (req, res) => {
	var username = req.body.username
	var password = req.body.password
	var email = req.body.email
	var rollNumber = req.body.rollNumber

	// log only if env is not production
	if (process.env.NODE_ENV !== 'production') {
		console.log(`username: ${username}, password: ${password}, email: ${email}`);
	}
	console.log(username, password);
	User.register(new User({ username: username, email : email, rollNumber: rollNumber}), password, (err, user) => {
		if (err) {
			console.log(err);
			return res.status(401).send(err);
		}

		passport.authenticate("local")(req, res, () => {
			res.status(200).send(user);
		});
	});
});


authRouter.post("/login", 
	passport.authenticate("local", { failWithError: true }), 
	(req, res) => {
		console.log(req.session.messages)
		res.status(200).send({user: req.user.username})
	},
	(err, req, res, next) => {
		res.send(err.message).status(err.status)
	}
)

authRouter.get("/login", passport.authenticate("session"), (req, res) => {
	if (req.isAuthenticated()) {
		res.send({isAuth: true, user: req.user.username}).status(200)
	}
	else {
		res.send({isAuth: false}).status(200)
	}
})


authRouter.post("/logout", passport.authenticate("session"), function (req, res) {
	// console.log(req.user);
	req.logout();
	res.sendStatus(202);
});

module.exports = authRouter;
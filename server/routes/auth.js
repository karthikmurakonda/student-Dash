const authRouter = require('express').Router();
const passport = require('passport');
const User = require('../models/user');

authRouter.post("/register", (req, res) => {
	var fname = req.body.fname
	var lname = req.body.lname
	var email = req.body.email
	var username = req.body.username
	var password = req.body.password
	var rollNumber = req.body.rollNumber

	// log only if env is not production
	// if (process.env.NODE_ENV !== 'production') {
	// 	console.log(`username: ${username}, password: ${password}, email: ${email}`);
	// }

	User.register(new User({ fname: fname, lname: lname, email : email, username: username, rollNumber: rollNumber}), password, (err, user) => {
		if (err) {
			return res.status(401).send(err);
		}

		passport.authenticate("local")(req, res, () => {
			res.status(200).send(user.fname);
		});
	});
});


authRouter.post("/login", 
	passport.authenticate("local", { failWithError: true }), 
	(req, res) => {
		userData = (({ fname, lname, email, username, role }) => ({ fname, lname, email, username, role }))(req.user)
		res.status(200).send({user: userData})
	},
	(err, req, res, next) => {
		res.send(err.message).status(err.status)
	}
)

authRouter.get("/login", passport.authenticate("session"), (req, res) => {
	if (req.isAuthenticated()) {
		userData = (({ fname, lname, email, username, role }) => ({ fname, lname, email, username, role }))(req.user)
		res.send({isAuth: true, user: userData}).status(200)
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
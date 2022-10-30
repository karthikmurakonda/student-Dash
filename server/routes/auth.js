const authRouter = require('express').Router();
const passport = require('passport');
const sqlDB = require('../utlils/sql');
const crypto = require('crypto');

authRouter.post("/register", (req, res) => {
	var user = req.body
	user.salt = crypto.randomBytes(16);
	crypto.pbkdf2(user.password, user.salt, 310000, 32, 'sha256', (err, hashedPassword) => {
		if (err) { return next(err); }
		user.salt = user.salt.toString('hex')
		user.hash = hashedPassword.toString('hex')
		delete user.password;
		sqlDB.query('INSERT INTO users SET ?', user, (err) => {
			if (err) { 
				console.log(err); 
				res.status(500).send(err); 
			}
			else {
				res.status(200).send("User registered successfully");
			}
		});
	});
});

authRouter.post("/login", passport.authenticate("local", { failWithError: true }), (req, res) => {
		userData = (({ fname, lname, email, username, role, _id }) => ({ fname, lname, email, username, role, _id }))(req.user)
		res.status(200).send({user: userData})
	}, (err, req, res, next) => {
		res.send(err.message).status(err.status)
	}
)

authRouter.get("/login", passport.authenticate("session"), (req, res) => {
	if (req.isAuthenticated()) {
		userData = (({ fname, lname, email, username, role, _id }) => ({ fname, lname, email, username, role, _id }))(req.user)
		res.send({isAuth: true, user: userData}).status(200)
	}
	else {
		res.send({isAuth: false}).status(200)
	}
})


authRouter.post("/logout", passport.authenticate("session"), function (req, res) {
	req.logout();
	res.sendStatus(202);
});

authRouter.post("/usernameexists", (req, res) => {
	// usernameExists = await User.exists({username: req.body.username})
	// res.send({usernameExists}).status(200)
	sqlDB.query("SELECT * FROM users WHERE username = ?", [req.body.username], (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		}
		else {
			res.send({usernameExists: result.length > 0}).status(200)
		}
	})
})

module.exports = authRouter;

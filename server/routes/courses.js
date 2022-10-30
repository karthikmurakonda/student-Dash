const express = require('express');
const courseRouter = express.Router();
const passport = require('passport');
const sqlDB = require('../utlils/sql');

// Get courses info
courseRouter.get('/', async (req, res) => {
	var search = ""
	if (req.query.search) {
		search = req.query.search
	}
	sqlDB.query("SELECT * FROM courses WHERE code LIKE ? OR name LIKE ?", ["%"+search+"%", "%"+search+"%"], function (err, result, fields) {
		if (err) {
			console.log(err);
			res.send(err);
		}
		else {
			if (req.query.page) {
				res.send(result.slice((req.query.page - 1) * 5, req.query.page * 5))
			}
			else {
				res.send(result)
			}
		}
	})
})

// Create a new course
courseRouter.post('/', passport.authenticate("session"), (req, res) => {
	if(req.user){
		if (req.user.role === 1 || req.user.role === 2) {	// check if user has role 1 or 2 (admin or teacher)
			sqlDB.query("INSERT INTO courses SET ?", req.body, (err, result) => {
				if (err) {
					console.log(err);
					res.status(500).send(err);
				}
				else {
					res.status(201).send("Course added!");
				}
			});
		} else {
			res.status(403).send("You are not authorized to create a course");
		}
	}
	else{
		res.sendStatus(401);
	}
});

// Get a single course
courseRouter.get('/:code', (req, res) => {
    sqlDB.query("SELECT * FROM courses WHERE code = ?", [req.params.code], (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		}
		res.send(result[0]);
	});
});

// Delete a course
courseRouter.delete('/:code', passport.authenticate("session"), (req, res) => {
	if(req.user){
		if (req.user.role === 1 || req.user.role === 2) {
			sqlDB.query("DELETE FROM courses WHERE code = ?", [req.params.code], (err, result) => {
				if (err) {
					console.log(err);
					res.status(500).send(err);
				}
				else {
					res.status(200).send("Course deleted!");
				}
			});
		} else {
			res.status(403).send("You are not authorized to delete a course");
		}
	}
	else{
		res.sendStatus(401);
	}
});

module.exports = courseRouter;
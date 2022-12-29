const express = require('express');
const passport = require('passport');
const slotRouter = express.Router();
const sqlDB = require('../utlils/sql');

// Get slot ids
slotRouter.get('/ids', (req, res) => {
	  sqlDB.query('SELECT DISTINCT id FROM time_slots ORDER BY id', (err, rows) => {
		if (err) {
			res.status(500).send(err);
		} else {
			ids = [];
			rows.forEach((row) => {
				ids.push(row.id);
			});
			res.status(200).send(ids);
		}
	});
});

// Get a single slot
slotRouter.get('/:id', (req, res) => {
	sqlDB.query("SELECT day, start_time, end_time FROM time_slots WHERE id = ?", [req.params.id], (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		}
		else {
			res.send(result);
		}
	});
});

// Add a slot
slotRouter.post('/', passport.authenticate('session'), (req, res) => {
	if (req.user) {
		if (req.user.role == 1 || req.user.role == 2) {		// check if user has role 1 or 2 (admin or teacher)
			var values = []
			req.body.classes.forEach(myClass => {
				values.push([req.body.id, myClass.day, myClass.start_time, myClass.end_time]);
			});
			sqlDB.query("INSERT INTO time_slots (id, day, start_time, end_time) VALUES ?", [values], (err, result) => {
				if (err) {
					console.log(err);
					res.status(500).send(err);
				}
				else {
					res.send("Slot added successfully");
				}
			});
		}
		else {
			res.status(403).send("You are not authorized to add a slot");
		}
	}
	else {
		res.sendStatus(401);
	}
});

module.exports = slotRouter;
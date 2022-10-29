const express = require('express');
const slotRouter = express.Router();
const sqlDB = require('../sql');

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

module.exports = slotRouter;
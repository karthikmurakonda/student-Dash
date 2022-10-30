const passport = require('passport')
const sqlDB = require("./sql")
const crypto = require('crypto')



function verifyUser(username, password, cb) {
    sqlDB.query('SELECT * FROM users WHERE username = ?', [ username ], function(err, rows) {
		var row = rows[0]
		if (err) { return cb(err) }
		if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }) }

		crypto.pbkdf2(password, Buffer.from(row.salt, 'hex'), 310000, 32, 'sha256', function(err, hashedPassword) {
			if (err) { return cb(err) }
			if (!crypto.timingSafeEqual(Buffer.from(row.hash, 'hex'), hashedPassword)) {
			return cb(null, false, { message: 'Incorrect username or password.' })
			}
			return cb(null, row)
		});
    });
}

function userSerializer(user, cb) {
    cb(null, user.username)
}

function userDeserializer(username, cb) {
    sqlDB.query('SELECT * FROM users WHERE username = ?', [ username ], function(err, rows) {
        if (err) { return cb(err) }
        cb(null, rows[0])
    })
}


module.exports = { verifyUser, userSerializer, userDeserializer }
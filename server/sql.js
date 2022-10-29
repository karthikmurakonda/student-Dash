const mysql = require('mysql');

// mysql connection
const sqlDB = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
});
sqlDB.connect(function(err) {
	if (err) throw err;
	console.log("Connected to MySQL!");
});

module.exports = sqlDB;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
	fname: {
		type: String,
		required: true
	},
	lname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	username:{
		type: String,
		required: true,
		unique: true
	},
	rollNumber:{
		type: String,
		required: false,
		unique: false
	},
	role: {
		// 0 - student , 1 - teacher , 2 - admin
		type: Number,
		default: 0
	},

});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
	username:{
		type: String,
		required: true,
	},
	password:{
		type: String,
	},
	rollNumber:{
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true
	},
	role: {
		// 0 - student , 1 - teacher , 2 - admin
		type: Number,
		default: 0
	},

});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
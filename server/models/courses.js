const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// Schema to store weekly course timetable
const courseSchema = new Schema({
    course_name: {
        type: String,
        required: true
    },
    course_code: {
        type: String,
        required: true
    },
    course_type: {
        type: String,
        required: true
    },
    course_credit: {
        type: Number,
        required: true
    },
    course_semester: {
        type: String,
        required: true
    },
    course_year: {
        type: String,
        required: true
    },
    // course timetable with type timestamp in array
    course_timetable: {
        type: Array,
        required: true
    },

    course_venue: {
        type: String,
        required: true
    },
    course_instructor: {
        type: String,
        required: true
    },
    course_capacity: {
        type: Number,
        required: true
    },
    course_remaining: {
        type: Number,
        required: true
    }
});

// plugin to passport-local-mongoose
courseSchema.plugin(passportLocalMongoose);

// export the model
module.exports = mongoose.model('Course', courseSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const { toJSON, paginate } = require( './plugings');

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
    course_credit: {
        type: Number,
        required: true
    },
    // course timetable with type timestamp in array
    course_timetable: {
        type: [{
            day : {type: String},
            start_time : {type: String},
            end_time : {type: String}
        }],
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
    course_link: { // link to course website or syllabus
        type: String,
        required: true
    },
    course_capacity: {
        type: Number,
        required: true
    },
});

courseSchema.plugin(toJSON);
courseSchema.plugin(paginate);

// export the model
module.exports = mongoose.model('Course', courseSchema);

const Courses = require('../models/courses');
const express = require('express');
const courseRouter = express.Router();


courseRouter.get('/', (req, res) => {
    Courses.find({/* To-Do*/}, (err, courses) => {
        if (err) {
            res.status(500).send(err);
        }
        res.send(courses);
    });
});

// Get a single course
courseRouter.get('/:id', (req, res) => {
    Courses.findById(req.params.id, (err, course) => {
        if (err) {
            res.status(500).send(err);
        }
        res.send(course);
    });
});


// Create a new course
courseRouter.post('/', (req, res) => {
    const newCourse = new Courses(req.body);
    newCourse.save((err, course) => {
        if (err) {
            res.status(500).send(err);
        }
        res.send(course);
    });
});

module.exports = courseRouter;
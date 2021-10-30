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

courseRouter.post('/:courseId', )

module.exports = courseRouter;
const Courses = require('../models/courses');
const express = require('express');
const courseRouter = express.Router();
const passport = require('passport');
const pick = require('../utlils/pick');


courseRouter.get('/', async (req, res) => {
    // use pagination to paginate the results
    const filter = pick(req.query, ['course_name', 'course_code']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    if (!req.query.sortBy) {
        options.sortBy = 'course_name';
    }
    res.send( await Courses.paginate(filter, options, 'course_name'));
});
// Create a new course
courseRouter.post('/',passport.authenticate("session") ,(req, res) => {
    // check if user has role 2 or 3 (admin or teacher)
    if (req.user.role === 1 || req.user.role === 2) {
        Courses.create(req.body, (err, course) => {
            console.log(req.body);
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            res.send(course);
        });
    } else {
        res.status(401).send("You are not authorized to create a course");
    }
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

// delete a course
courseRouter.delete('/:id', passport.authenticate("session"), (req, res) => {
    // check if user has role 2 or 3 (admin or teacher)
    if (req.user.role === 1 || req.user.role === 2) {
        Courses.findByIdAndRemove(req.params.id, (err, course) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            res.send(course);
        });
    } else {
        res.status(401).send("You are not authorized to delete a course");
    }
});



module.exports = courseRouter;
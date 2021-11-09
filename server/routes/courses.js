const Courses = require('../models/courses');
const express = require('express');
const courseRouter = express.Router();
const passport = require('passport');
const pick = require('../utlils/pick');


courseRouter.get('/', async (req, res) => {
    // use pagination to paginate the results
    var filter = {}
    if (req.query.course_name) {
        var nameRegex = new RegExp(req.query.course_name);
        filter = {$or: [{'course_name': {$regex: nameRegex, $options: 'i'}}, {'course_code': {$regex: nameRegex, $options: 'i'}}]}
    }
    else {
        filter = pick(req.query, ['course_name', 'course_code']);
    }
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    if (!req.query.sortBy) {
        options.sortBy = 'course_name';
    }
    res.send( await Courses.paginate(filter, options, ['course_name', 'course_code']));
});
// Create a new course
courseRouter.post('/',passport.authenticate("session") ,(req, res) => {
    if(req.user){
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
    }
    else{
        res.sendStatus(401);
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
    if(req.user){
        if (req.user.role === 1 || req.user.role === 2) {
            Courses.findByIdAndRemove(req.params.id, (err, course) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                }
                if(course){
                res.send(course);
                }
                else{
                    res.sendStatus(404);
                }
            });
        } else {
            res.status(401).send("You are not authorized to delete a course");
        }
    }
    else{
        res.sendStatus(401);
    }
});



module.exports = courseRouter;
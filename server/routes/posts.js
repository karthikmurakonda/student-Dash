const Post = require('../models/posts');
const passport = require('passport');
const express = require('express');
const postRouter = express.Router();
const pick = require('../utlils/pick');

postRouter.get('/', passport.authenticate('session'), async (req, res) => {
    if(req.user){
        const filter = pick(req.query, ['author'])
        const options = pick(req.query, ['sortBy', 'limit', 'skip', 'populate', 'page'])
        res.send( await Post.paginate(filter, options ));   
    }
    else{
        res.sendStatus(401);
    }
});


postRouter.get('/:id', passport.authenticate('session'), (req, res) => {
    if(req.user){
        Post.findById(req.params.id, (err, post) => {
            if (err) {
            res.send(err);
            }
            res.json(post);
        });
    }
    else{
        res.sendStatus(401);
    }   
});

postRouter.post('/', passport.authenticate('session'), (req, res) => {
    if(req.user){
        const newPost = new Post(req.body);
    newPost.authorId = req.user.id;
    newPost.save((err, post) => {
        if (err) {
        res.send(err);
        }
        res.send(post);
    });
    }
    else{
        res.sendStatus(401);
    }
    
});

postRouter.delete('/:id', passport.authenticate('session'), (req, res) => {
    if(req.user){
        if (req.user.role === 1 || req.user.role === 2) {
            Post.findByIdAndRemove(req.params.id, (err, post) => {
                if (err) {
                res.send(err);
                }
                if(post){
                res.sendStatus(204);
                }
                else{
                res.sendStatus(404);
                }
            });
        }
        else {
            const post = Post.findById(req.params.id);
            console.log(post);
            if(post){
                if (post.authorId === req.user.id) {
                    Post.findByIdAndDelete(req.params.id, (err, post) => {
                        if (err) {
                        res.send(err);
                        }
                        res.sendStatus(204);
                    });
                }
                else {
                    res.sendStatus(403);
                }
            }
            else {
                res.sendStatus(404);
            }
        }
    }
    else {
        res.sendStatus(401);
    }
});


module.exports = postRouter;

const Post = require('../models/posts');
const passport = require('passport');
const express = require('express');
const postRouter = express.Router();
const pick = require('../utlils/pick');
const sqlDB = require('../sql');
var crypto = require('crypto');

postRouter.get('/', passport.authenticate('session'), async (req, res) => {
    if(req.user){
        var page = 1;
        if (req.query.page) {
            page = parseInt(req.query.page);
        }
        var totalPages = 0;
        var totalPosts = 0;
        var sql = "SELECT COUNT(*) AS total FROM posts";
        sqlDB.query(sql, function (err, result, fields) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                totalPosts = result[0].total;
                totalPages = Math.ceil(totalPosts / 10);
				sqlDB.query("SELECT * FROM posts ORDER BY `posts`.`created_at` DESC LIMIT 10 OFFSET ?", [(page-1)*10], (err, result) => {
					if (err) {
						console.log(err);
						res.status(500).send(err);
					}
					else {
						var response = {
							"totalPages": totalPages,
							"totalPosts": totalPosts,
							"page": page,
							"results": result
						}
						res.send(response);
					}
				});
            }
        });
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
			else {
				res.json(post);
			}
        });
    }
    else{
        res.sendStatus(401);
    }   
});

postRouter.post('/', passport.authenticate('session'), (req, res) => {
    var temp = req.body;
    temp.author_id = req.user.id;
    temp.id = crypto.randomBytes(10).toString('hex');
    console.log(req.user);
    console.log(req);
    if(req.user && req.body.author===req.user.username){
        sqlDB.query("INSERT INTO posts SET ?", req.body, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                res.status(201).send("Post added!");
            }
        });
    }else{
        res.sendStatus(401);
    }
    
});

postRouter.delete('/:id', passport.authenticate('session'), (req, res) => {
    if(req.user){
        if (req.user.role === 1 || req.user.role === 2) {
            sqlDB.query("DELETE FROM posts WHERE id = ?", [req.params.id], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                }
                else {
                    res.status(201).send("Post deleted!");
                }
            });
        }
        else {
            sqlDB.query("SELECT * FROM posts WHERE id = ?", [req.params.id], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                }
                else {
                    // if not present
                    if (result.length === 0) {
                        res.status(404).send("Post not found!");
                    }
                    else if (result[0].author_id === req.user.id) {
                        sqlDB.query("DELETE FROM posts WHERE id = ?", [req.params.id], (err, result) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send(err);
                            }
                            else {
                                res.status(201).send("Post deleted!");
                            }
                        });
                    }
                    else {
                        res.sendStatus(403);
                    }
                }
            });
        }
    }
    else {
        res.sendStatus(401);
    }
});


module.exports = postRouter;

// Rout to auth.js if the endpoint is /auth
authRouter=require('./auth');
postRouter = require('./posts');
courseRouter = require('./courses');
const express = require('express');
const router = express.Router();

router.use('/auth', authRouter);
router.use('/courseplanner',courseRouter);
router.use('/post',postRouter);
module.exports = router;
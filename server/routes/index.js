// Rout to auth.js if the endpoint is /auth
authRouter=require('./auth');
postRouter = require('./posts');
courseRouter = require('./courses');
slotRouter = require('./slots');
const express = require('express');
const router = express.Router();

router.use('/auth', authRouter);
router.use('/course',courseRouter);
router.use('/post',postRouter);
router.use('/slot',slotRouter);
module.exports = router;
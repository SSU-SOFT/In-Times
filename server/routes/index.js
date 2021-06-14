var express = require('express');
var router = express.Router();


import postRouter from './posts.js';


// router.use('/user', users);
router.use('/post', postRouter);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

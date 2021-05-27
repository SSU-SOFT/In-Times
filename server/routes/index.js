var express = require('express');
var router = express.Router();

// const users = require('./users.js');
const posts = require('./posts.js');


// router.use('/user', users);
router.use('/post', posts);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

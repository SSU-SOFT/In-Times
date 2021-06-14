import news from '../controller/news.js'
var express = require('express');
var router = express.Router();
var multer = require('multer') // 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
      }
})
// var upload = multer({ dest: 'uploadedFiles/' }); // 3-1
var upload = multer({ storage: storage }); // 3-2

/* GET users listing. */
router.get('/', news.getNews);
router.get('/:aId', news.getNewsId);
// router.post('/', upload.single('images'), post.createPost);
// router.put('/:id', upload.single('images'), post.updatePost);
// router.delete('/:id', post.deletePost);

module.exports = router;
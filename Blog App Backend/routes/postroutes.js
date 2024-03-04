const express = require("express");
const router = express.Router();
const controller = require('./controllers/postController');


router.get('/posts/' , controller.getPosts );

router.post('/posts' , controller.postPosts);

router.put('/posts/:Id', controller.updatePost);

router.delete('/posts/:Id' , controller.deletePost);

module.exports = router;
const express = require('express');
const router = express.Router();
import comment from '../controller/comment.js'


// 댓글 보기
router.get('/:cId', comment.getComment)

// 댓글 달기
router.post('/:cId', comment.createComment)

// 댓글 수정
router.put('/:cmId', comment.updateComment)

// 댓글 삭제
router.delete('/:cmId', comment.deleteComment)


export default router;
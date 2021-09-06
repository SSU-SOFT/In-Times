import db from '../middleware/db'
import security from '../middleware/security'
import httpStatus from 'http-status-codes'

//댓글 보기
async function getComment(req, res) {
    try {
        const cId = req.params.cId;
        const comments = await db.query(`SELECT cmId, cId, nickname, comment from Comments where cId=? ORDER BY cmId DESC`, [cId]);
        res.status(httpStatus.OK).send({
            success : comments.length?true:false,
            comments: comments
        })
    } catch (error) {
        console.error(error, "get comment api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
    }
}

// 댓글 달기
async function createComment(req, res) {
    console.log(req.body);
    try {
        const cId = req.params.cId;
        const encrypt = await security.security(req.body.pw);
        
        const comment = {
            cId : cId,
            nickname : req.body.nickname,
            comment : req.body.comment,
            pw : encrypt.pw,
            pwkey : encrypt.pwKey
        }        
        console.log(comment);

        const result = await db.query('INSERT into Comments SET ?', [comment]);
        
        res.status(httpStatus.OK).send({
            success : result.insertId?true:false,
            commentInfo : {
                cmId : result.insertId,
                cId : cId,
                nickname : comment.nickname,
                comment : comment.comment
            }
        })
    } catch (error) {
        console.error(error, "create comment api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
    }
}

async function updateComment(req, res) {
    try {
        const cmId = req.params.cmId
        const key = await db.query(`SELECT pwkey from Comments where cmId = ?`, [cmId]);
        const secret = await security.pbkdf2(req.body.pw, key[0].pwkey);
        const comment = {
            nickname : req.body.nickname,
            comment : req.body.comment
        }
        
        const result = await db.query('update Comments set comment = ? where cmId =? and pw = ?', [comment, cmId, secret.pw])
        console.log(result);
        
        res.status(httpStatus.OK).send({
            success : result.changedRows?true:false,
            commentInfo : comment
        })
        
    } catch (error) {
        console.error(error, "update comment api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
    }
}

async function deleteComment(req, res) {
    try {
        const cmId = req.params.cmId
        const key = await db.query(`SELECT pwkey from Comments where cmId = ?`, [cmId]);
        const secret = await security.pbkdf2(req.body.pw, key[0].pwkey);

        const result = await db.query('DELETE from Comments where cmId = ? AND pw = ?', [cmId, secret.pw]);
        console.log(result);

        res.status(httpStatus.OK).send({
            success : result.affectedRows?true:false,
            msg : result.affectedRows?"SUCCESS DELETE COMMENTS":"FAIL DELETE COMMENTS"
        })
        
    } catch (error) {
        console.error(error, "delete comment api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
    }
}

export default {
    getComment,
    createComment,
    updateComment,
    deleteComment
}
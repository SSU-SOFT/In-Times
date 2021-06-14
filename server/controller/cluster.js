import db from '../middleware/db'
import httpStatus from 'http-status-codes'
import security from '../middleware/security'
//Date to yyyy-mm-dd
function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '-' + month + '-' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}


// 게시글 조회
async function getAll (req, res) {
    console.log(req.query);

    try {
        let SQLresult = await db.query('select * from News limit 20;');
                
        if(newsInfo.length > 0){
            const returnObj = {
                SQLresult : SQLresult
            }
            res.status(httpStatus.OK).send(returnObj)
        } else{
            res.status(httpStatus.NOT_FOUND).send()
        }
   } catch(error) {
        console.error(error, "posts api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
   }
}

async function getCluster (req, res) {
    let id = req.params.id;
    try {
        let newsInfo = await db.query('select * from News where postID = ?', [id]);

        if(postInfo.length > 0){
            const returnObj = {
                newsInfo : newsInfo
            }
            res.status(httpStatus.OK).send(returnObj)
        } else{
            res.status(httpStatus.NOT_FOUND).send()
        }
   } catch(error) {
        console.error(error, "posts api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
   }
}


export default {
    getAll,
    getCluster,
}
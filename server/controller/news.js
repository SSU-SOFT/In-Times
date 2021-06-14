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
async function getNews (req, res) {
    console.log(req.query);
    const cId = req.query.cId;
    const page = req.query.page?req.query.page-1:0;
    const pageSize = req.query.pageSize?parseInt(req.query.pageSize):20;

    try {
        let result = await db.query('select * from News WHERE cId = ? AND aId >= ? ORDER BY aId ASC limit ?;', [cId, page*pageSize, pageSize]);
        let newsInfo = [];
        if(result.length > 0){
            result.map((val) =>{
                const date = getFormatDate(val.date);
                const text = val.text.toString().substring(0,200);
                
                newsInfo.push({
                    aId : val.aId,
                    cId : val.cId,
                    date : date,
                    category: val.category,
                    press: val.press,
                    headline: val.headline,
                    text: text,
                    url: val.url,
                    img: val.img?val.img:"/moon.png"
                });
            });
            const returnObj = {
                newsInfo : newsInfo
            }
            res.status(httpStatus.OK).send(returnObj)
        } else{
            res.status(httpStatus.NOT_FOUND).send()
        }
   } catch(error) {
        console.error(error, "news api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
   }
}

async function getNewsId (req, res) {
    const aId = req.params.aId;
    try {
        let result = await db.query('select * from News WHERE aId = ?;', [aId]);
        let newsInfo = [];
        if(result.length > 0){
            result.map((val) =>{
                const date = getFormatDate(val.date);
                newsInfo.push({
                    aId : val.aId,
                    cId : val.cId,
                    date : date,
                    category: val.category,
                    press: val.press,
                    headline: val.headline,
                    text: val.text,
                    url: val.url,
                    img: val.img!="[]"?val.img:"/moon.png"
                });
            });
            const returnObj = {
                newsInfo : newsInfo
            }
            res.status(httpStatus.OK).send(returnObj)
        } else{
            res.status(httpStatus.NOT_FOUND).send()
        }
   } catch(error) {
        console.error(error, "news api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
   }
}

export default {
    getNews,
    getNewsId,
}
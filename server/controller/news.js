import db from '../middleware/db'
import httpStatus from 'http-status-codes'
import security from '../middleware/security'
import modules from './modules.js'

// 게시글 조회
async function getNews (req, res) {
    console.log(req.query);
    const cId = req.query.cId?req.query.cId:1;
    const page = req.query.page?req.query.page-1:0;
    const pageSize = req.query.pageSize?parseInt(req.query.pageSize):20;
    
    try {
        let result = await db.query('SELECT * FROM News WHERE cId = ? ORDER BY aId ASC LIMIT ? OFFSET ?;', [cId, pageSize, page*pageSize]);
        let newsInfo = [];
        if(result.length > 0){
            result.map((val) =>{
                const date = modules.getFormatDate(val.date);
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
                    img: val.img==="[]"?"/images/no-image.png":val.img.replace(/\[|\]|\'| /g, "")
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
                const date = modules.getFormatDate(val.date);
                newsInfo.push({
                    aId : val.aId,
                    cId : val.cId,
                    date : date,
                    category: val.category,
                    press: val.press,
                    headline: val.headline,
                    text: val.text,
                    url: val.url,
                    img: val.img==="[]"?"/images/no-image.png":val.img.replace(/\[|\]|\'| /g, "")
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
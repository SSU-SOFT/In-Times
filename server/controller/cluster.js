import db from '../middleware/db'
import httpStatus from 'http-status-codes'
import security from '../middleware/security'
import modules from './modules.js'


// 게시글 조회
async function getClusterAll (req, res) {
    const year = parseInt(req.params.year);
    console.log(`${year}-01-01`, `${year+1}-01-01`);
    try {
        let result = await db.query(`SELECT * FROM Clusters WHERE date >= ? AND date < ?`, [`${year}-01-01`, `${year+1}-01-01`]);
        const clusterInfo = [];

        if(result.length > 0){
            
            result.map((val)=>{
                const date = modules.getFormatDate(val.date).substring(0, 7);
                clusterInfo.push({
                    cId : val.cId,
                    count : val.count,
                    category : val.category,
                    Topic : val.Topic.replace(/\[|\]|\'| /g, "").split(',').slice(0,5),
                    summary : val.summary,
                    img : val.img,
                    date : date,
                })
            });
            const returnObj = {
                clusterInfo : clusterInfo,
            }
            res.status(httpStatus.OK).send(returnObj)
        } else{
            res.status(httpStatus.NOT_FOUND).send()
        }
   } catch(error) {
        console.error(error, "clusters api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
   }
}

async function getClusterId (req, res) {
    const year = parseInt(req.params.year);
    const cId = req.params.cId;
    console.log(year);
    try {
        let result = await db.query('select * from Clusters where cId = ?', [cId]);
        const clusterInfo = [];

        if(result.length > 0){
            result.map((val)=>{
                clusterInfo.push({
                    cId : val.cId,
                    count : val.count,
                    category : val.category,
                    Topic : val.Topic.replace(/\[|\]|\'| /g, "").split(','),
                    summary : val.summary,
                    img : val.img,
                    date : modules.getFormatDate(val.date).substring(0, 7)
                })
            });
            const returnObj = {
                clusterInfo : clusterInfo,
            }
            res.status(httpStatus.OK).send(returnObj)
        } else{
            res.status(httpStatus.NOT_FOUND).send()
        }
   } catch(error) {
        console.error(error, "clusters api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
   }
}

export default {
    getClusterAll,
    getClusterId,
}
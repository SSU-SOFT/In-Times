import db from '../middleware/db'
import httpStatus from 'http-status-codes'
import security from '../middleware/security'

// 게시글 조회
async function getClusterAll (req, res) {
    try {
        let result = await db.query('select * from Clusters;');
        const clusterInfo = [];

        if(result.length > 0){
            result.map((val)=>{
                clusterInfo.push({
                    cId : val.cId,
                    count : val.count,
                    Topic : val.Topic.replace(/\[|\]|\'| /g, "").split(',').slice(0,5),
                    summary : val.summary,
                    img : val.img,
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
    let cId = req.params.cId;
    try {
        let result = await db.query('select * from Clusters where cId = ?', [cId]);
        const clusterInfo = [];

        if(result.length > 0){
            result.map((val)=>{
                clusterInfo.push({
                    cId : val.cId,
                    count : val.count,
                    Topic : val.Topic.replace(/\[|\]|\'| /g, "").split(','),
                    summary : val.summary,
                    img : val.img,
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
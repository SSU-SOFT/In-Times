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
        let newsInfo = [];
        SQLresult.map((val) =>{
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
        
        if(newsInfo.length > 0){
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

async function getPost (req, res) {
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
        console.error(error, "news api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
   }
}


// 게시글 작성
// async function createPost(req, res) {

//     const userID = req.body.userID;
//     const categoryID = req.body.categoryID;
//     const content = req.body.content;
//     const imgPath = 'http://15.164.218.93/images/'+req.file.filename;
//     const latitude = req.body.latitude;
//     const longitude = req.body.longitude;
//     // console.log(imgPath);
//     try {
//         let postInfo = await db.query('Insert into posts (userID, categoryID, content, timestamp, imgPath, latitude, longitude) VALUES (?, ?, ?, NOW(), ?, ?, ?)',[userID, categoryID, content, imgPath, latitude, longitude]);
//         console.log(postInfo);
//         if(postInfo.affectedRows > 0){
//             const returnObj = {
//                 message : 'Success post'
//             }
//             res.status(httpStatus.OK).send(returnObj)
//         } else{
//             res.status(httpStatus.NOT_FOUND).send({message : 'Fail post'});
//         }
//    } catch(error) {
//         console.error(error, "posts api error")
//         res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
//    }
// }

// async function updatePost(req, res) {

//     console.log(req);
//     // console.log(req.body);

//     let id = req.params.id;

//     const categoryID = req.body.categoryID;
//     const content = req.body.content;
//     const imgPath = '/img/'+req.file.filename;
//     const latitude = req.body.latitude;
//     const longitude = req.body.longitude;
//     // console.log(imgPath);
//     try {
//         let postInfo = await db.query('Update posts SET categoryID=?, content=?, imgPath=?, latitude=?, longitude=? where postID = ?',[categoryID, content, imgPath,latitude, longitude, id]);

//         if(postInfo.affectedRows > 0){
//             const returnObj = {
//                 message : 'Success update',
//             }
//             res.status(httpStatus.OK).send(returnObj)
//         } else{
//             res.status(httpStatus.NOT_FOUND).send({message : 'Fail update'});
//         }
//    } catch(error) {
//         console.error(error, "posts api error")
//         res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
//    }
// }

// async function deletePost(req, res) {
//     let id = req.params.id;
//     try {
//         let postInfo = await db.query('delete from posts where postID = ?', [id]);

//         if(postInfo.affectedRows > 0){
//             const returnObj = {
//                 message : 'Success delete',
//             }
//             res.status(httpStatus.OK).send(returnObj)
//         } else{
//             res.status(httpStatus.NOT_FOUND).send({message : 'Fail delete'});
//         }
//    } catch(error) {
//         console.error(error, "posts api error")
//         res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
//    }
// }

export default {
    getAll,
    getPost,
    // createPost,
    // updatePost,
    // deletePost,
}
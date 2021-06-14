import cluster from '../controller/cluster.js';
var express = require('express');
const router = express.Router();


// 클러스터와 클러스터 단어 5개씩 있는 것을 전송
router.get('/', cluster.getClusterAll);

// 클러스터 id와 클러스터 WordCloud, 클러스터 개수, 20개씩 전달
router.get('/:cId', cluster.getClusterId);

export default router
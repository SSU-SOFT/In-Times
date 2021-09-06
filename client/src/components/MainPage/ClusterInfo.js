import React, { useState, useEffect } from "react";
import { cIdState, yearState } from "../../state/state";
import { useRecoilState } from "recoil";
import comment_icon from "../../assets/icons/comment.png";
import instance from "../../module/instance";
import "../../style/ClusterInfo.css";
import {Space} from 'antd';
import Comment from './Comment';

const config = require("../../config.json");
const ClusterInfo = () => {
  const [cId, setCid] = useRecoilState(cIdState);
  const [year, setYear] = useRecoilState(yearState);
  const [cinfo, setCinfo] = useState({});
  const [comments, setComments] = useState([]);
  
  const getData = async () => {
    if (year === 2019 && cId != 0) {
      instance
        .get(`/api/cluster/${year}/${cId}`)
        .then((response) => {
          console.log(response.data.clusterInfo[0]);
          setCinfo(response.data.clusterInfo[0]);
        }) // SUCCESS
        .catch((response) => {
          console.log(response);
        }); // ERROR
      instance.get(`/api/comment/${cId}`)
        .then((res)=>{
          console.log(res.data);
          setComments(res.data.comments);
        })
        .catch((err)=>{
          console.log(err);
        })
    } else if (year === 2020) {
      setCinfo({});
    }
  };

  useEffect(() => {
    getData();
  }, [cId, ]);

  return (
    <>
      <div className="ClusterInfoMain">
        <div>{cinfo.count}</div>
        <div>{cinfo.date}</div>

        <div className="cinfocontent">
          <div style={{ display: "flex", justifyContent: "center" }}>
            {
                cinfo.img!=null?<img src={config.server + ":5000" + cinfo.img} className="cinfoImg"></img>:null
            }
            
          </div>
        </div>
        <div className="InfoContent">
          {cinfo.Topic != null
            ? cinfo.Topic.map((v, i) => (
                <div className="Topics" key={i}>
                  {v}
                </div>
              ))
            : null}
        </div>
        <Space style={{padding:'10px', width:'100%', overflowX:'scroll'}}>
          {comments.map((el, i)=>{return <Comment>{el}</Comment>})}
        </Space>
        <div
          style={{
            position: "sticky",
            float: "right",
            bottom: "0",
            width: "50px",
            height: "50px",
          }}
          onClick={() => {alert(1);}}
        >
          <img src={comment_icon} width={50} height={50} />
        </div>
      </div>
    </>
  );
};

export default ClusterInfo;

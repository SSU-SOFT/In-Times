import React, { useState, useEffect } from "react";
import { cIdState, yearState } from "../../state/state";
import { useRecoilState } from "recoil";

import instance from "../../module/instance";

import "../../style/ClusterInfo.css";
const config = require("../../config.json");
const ClusterInfo = () => {
  const [cId, setCid] = useRecoilState(cIdState);
  const [year, setYear] = useRecoilState(yearState);
  const [cinfo, setCinfo] = useState({});

  const getData = async () => {
    if (year === 2019 && cId != 0) {
      await instance
        .get(`/api/cluster/${year}/${cId}`)
        .then((response) => {
          console.log(response.data.clusterInfo[0]);
          setCinfo(response.data.clusterInfo[0]);
        }) // SUCCESS
        .catch((response) => {
          console.log(response);
        }); // ERROR
    } else if (year === 2020) {
      setCinfo({});
    }
  };

  useEffect(() => {
    getData();
  }, [cId]);

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
      </div>
    </>
  );
};

export default ClusterInfo;

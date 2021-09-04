import React, { useState, useEffect } from "react";
import "../../style/TimeBarAsset.css";
import { cIdState } from "../../state/state";
import { useRecoilState } from "recoil";
import { Popover ,Divider,Card} from "antd";
import { AiOutlineCaretUp } from "react-icons/ai";
const config = require('../../config.json');

const TimeBarAsset = (props) => {

    const {clusterInfo}=props;
    
    const { Meta } = Card;
    const [cId, setCid] = useRecoilState(cIdState);
    const [active, setActive] = useState(false);

    const OnClickAsset = () => {
    setCid(clusterInfo.cId);
    };

  useEffect(() => {
    if (cId == clusterInfo.cId) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  const content=(  
  <div>

    <div>   
        <img src={config.server+":5000"+clusterInfo.img} width="200px"></img>
    </div>
    <Divider style={{
        marginBottom:"2px",
        marginTop:"2px",
    }}></Divider>
    <div className="CardDate">
        {clusterInfo.date}
    </div>
    <div className="CardContent">
        {clusterInfo.Topic.map((v)=><div className="Topics">{v}</div>)}
    </div>
  </div>
  );

  return (
    <>
      <Popover content={content} placement="bottomLeft">
        <div
          className={"TimeBarAsset " + (active ? "active" : "")}
          onClick={OnClickAsset}
        >
          {/* <AiOutlineCaretUp/> */}
          
            <div className="AssetDate">
                {clusterInfo.date.substring(5, 7)}
            </div>
          
        </div>
      </Popover>
    </>
  );
};

export default TimeBarAsset;

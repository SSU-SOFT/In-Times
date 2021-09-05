import React, { useState, useEffect } from "react";
import "../../style/TimeBarAsset.css";
import { cIdState } from "../../state/state";
import { useRecoilState } from "recoil";
import { Popover, Divider, Card } from "antd";
import { AiOutlineCaretUp } from "react-icons/ai";
const config = require("../../config.json");

const TimeBarAsset = (props) => {
  const { clusterInfo } = props;

  const { Meta } = Card;
  const [cId, setCid] = useRecoilState(cIdState);
  const [active, setActive] = useState(false);
  const [color, setColor] = useState("white");

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

  useEffect(() => {
    let month = clusterInfo.date.substring(5, 7);
    console.log("month:", month);
    switch (month) {
      case "01":
        setColor("#DB937B");
        break;
      case "02":
        setColor("#C098CD");
        break;
      case "03":
        setColor("#C1E8E5");
        break;
      case "04":
        setColor("#DF4954");
        break;
      case "05":
        setColor("#7CB266");
        break;
      case "06":
        setColor("#FED758");
        break;
      case "07":
        setColor("#E9B7C3");
        break;
      case "08":
        setColor("#F47F39");
        break;
      case "09":
        setColor("#5265B2");
        break;
      case "10":
        setColor("#9AB7D5");
        break;
      case "11":
        setColor("#C24A65");
        break;
      case "12":
        setColor("#1B8092");
        break;
    }
  }, [cId]);

  const content = (
    <div>
      <div className="CardDate">{clusterInfo.date}</div>
      <div>
        <Divider
          style={{
            marginBottom: "2px",
            marginTop: "2px",
          }}
        ></Divider>
        <img
          src={config.server + ":5000" + clusterInfo.img}
          width="200px"
        ></img>
      </div>

      <div className="CardContent">
        {clusterInfo.Topic.map((v) => (
          <div className="Topics">{v}</div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Popover content={content} placement="bottomLeft">
        <div
          className={"TimeBarAsset " + (active ? "active" : "")}
          onClick={OnClickAsset}
          style={{
            backgroundColor: color,
          }}
        >
          {/* <AiOutlineCaretUp/> */}

          {/* <div className="AssetDate">{clusterInfo.date.substring(5, 7)}</div> */}
        </div>
      </Popover>
    </>
  );
};

export default TimeBarAsset;

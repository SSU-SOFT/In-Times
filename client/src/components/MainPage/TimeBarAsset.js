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
        setColor("red");
        break;
      case "02":
        setColor("orange");
        break;
      case "03":
        setColor("yellow");
        break;
      case "04":
        setColor("green");
        break;
      case "05":
        setColor("blue");
        break;
      case "06":
        setColor("#1c148c");
        break;
      case "07":
        setColor("purple");
        break;
      case "08":
        setColor("red");
        break;
      case "09":
        setColor("red");
        break;
      case "10":
        setColor("red");
        break;
      case "11":
        setColor("red");
        break;
      case "12":
        setColor("red");
        break;
      case "01":
        setColor("red");
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

          <div className="AssetDate">{clusterInfo.date.substring(5, 7)}</div>
        </div>
      </Popover>
    </>
  );
};

export default TimeBarAsset;

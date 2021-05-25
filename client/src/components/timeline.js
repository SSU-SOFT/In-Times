import React, { useState } from "react";
import "../style/timeline.css";
import { Chrono } from "react-chrono";
import { Row, Col, Menu, Select, Button, Divider } from "antd";


const Timeline = () => {
  const items1 = [
    {
      title: "May 1940",
      cardTitle: "Dunkirk",
      cardSubtitle:
        "Men of the British Expeditionary Force (BEF) wade out to..",
      cardDetailedText:
        "Men of the British Expeditionary Force (BEF) wade out to..",
    },
  ];
  const { Option } = Select;

  const [items, setitems] = useState([
  ]);
  const [yearval, setyearval] = useState(2019);

  const DropDownSelect = (value) => {
    console.log(value);
    setyearval(value);
  };

  const OnGetClick = () => {
    let tempitem = [];

    if (yearval === "2020") {
      for (let i = 0; i < 5; i++) {
        const temp = {
          title: "May 1940",
          cardTitle: "Dunkirk",
          cardSubtitle:
            "Men of the British Expeditionary Force (BEF) wade out to..",
          cardDetailedText:
            "Men of the British Expeditionary Force (BEF) wade out to..",
        };

        tempitem.push(temp);
      }
    }

    setitems(tempitem);

    console.log(items);
    console.log("get");
  };

  return (
    <>
      <div className="timeline">
        <Row align="middle" justify="center" className="selectSection">
          <Select defaultValue="2019" onChange={DropDownSelect}>
            <Option value="2019">2019</Option>
            <Option value="2020">2020</Option>
          </Select>
          <div className="yearval">{yearval}</div>
          <Button onClick={OnGetClick}>Get</Button>
        </Row>
        <Divider></Divider>
        <Row>
          <Chrono
            items={items}
            scrollable
            cardPositionHorizontal
            hideControls
            allowDynamicUpdate
          ></Chrono>
        </Row>
      </div>
    </>
  );
};

export default Timeline;

import React, { useRef, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { yearState } from "../../state/state";

import "../../style/cover.css";
import Main from "../MainPage/Main";

import { Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Timeline from "../timeline";

const Cover = () => {
  const section = useRef(null);

  const [year, setYear] = useRecoilState(yearState);

  const scrollTo = (ref) => {
    window.scroll({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  };

  // useEffect(()=>{
  //   //console.log(year)
  // },[year]);

  const OnClickYear = (e) => {
    console.log(e);
    scrollTo(section);
    setYear(e);
  };

  return (
    <>
      <div className="CoverBox">
        <div className="CoverContent">
        <div className="circle2">
          </div>
          <div className="circle">
            <div className="logo">
              <div>INTIMES</div>
              <div className="sublogo">Korea News TImeLine Service</div>
            </div>
            <div className="logo_back">
              <div>Back</div>
              <div className="sublogo">Back</div>
            </div>
          </div>

          <div id="outer-orbit">
            <div className="outer-orbit-cirlces1">
              <div className="YearLink" onClick={() => OnClickYear(2019)}>
                2019
              </div>
            </div>

            <div id="outer-orbit2">
              <div className="outer-orbit-cirlces2">
                <div className="YearLink" onClick={() => OnClickYear(2020)}>
                  2020
                </div>
              </div>
            </div>
          </div>

          {/* <div className="circle">
            <div className="logo">
              <div>INTIMES</div>
              <div className="sublogo">Korea News TImeLine Service</div>
            </div>
          </div>
          <div className="circle2" />
          <div className="CoverButton">
            <Button type="primary" shape='circle' onClick={()=>scrollTo(section)} style={{
              width:"4rem",
              height:"4rem",
              fontSize:"2rem"
            }}>
                <DownOutlined>s</DownOutlined>
            </Button>
          </div>
          <div className="dot dot--one">

          </div> */}
        </div>
        <div className="background"></div>
      </div>
      <div ref={section}></div>
    </>
  );
};

export default Cover;

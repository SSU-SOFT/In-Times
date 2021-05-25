import React,{useRef} from "react";
import "../style/cover.css";

import { Button } from "antd";
import {DownOutlined} from '@ant-design/icons'
import Timeline from "./timeline";

const Cover = () => {

  const section=useRef(null);

  const scrollTo=(ref)=>{
    window.scroll(
      {
        top:ref.current.offsetTop,
        behavior:"smooth"
      }
    );
  }


  return (
    <>
      <div className="CoverBox">
        <div className="CoverContent">
          <div className="circle">
            <div className="logo">
              <div>INTIMES</div>
              <div className="sublogo">Korea News TImeLine Service</div>
            </div>
          </div>
          <div className="circle2" />
          <div className="CoverButton">
            <Button type="primary" shape='circle' onClick={()=>scrollTo(section)}>
                <DownOutlined>s</DownOutlined>
            </Button>
          </div>
        </div>
        <div className="background"></div>
      </div>
      <div ref={section}>
        <Timeline></Timeline>
      </div>
      
    </>
  );
};

export default Cover;

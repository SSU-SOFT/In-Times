import React from "react";
import TimeBar from "./TimeBar";
import { Layout } from "antd";
import SideMenu from "./SideMenu";
import ArticleContent from "./ArticleContent";

import "../../style/Main.css";


const Main = () => {
  return (
    <>
      <div className="Main">

        <TimeBar></TimeBar>

          <div className="MainContent">
            <SideMenu></SideMenu>
            <ArticleContent></ArticleContent>
          </div>

        
      </div>
      
    </>
  );
};

export default Main;

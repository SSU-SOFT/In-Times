import React from "react";
import TimeBar from "./TimeBar";
import { Layout, Menu, Breadcrumb } from "antd";
import SideMenu from "./SideMenu";
import ArticleContent from "./ArticleContent";
import { Row, Col } from "antd";
import "../../style/Main.css";
const { Header, Content, Footer, Sider } = Layout;

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

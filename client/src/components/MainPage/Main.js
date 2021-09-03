import React from "react";
import TimeBar from "./TimeBar";
import { Layout, Menu, Breadcrumb } from "antd";
import SideMenu from "./SideMenu";
import ArticleContent from "./ArticleContent";
import { Row, Col } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const Main = (props) => {
  return (
    <>
      <TimeBar year={props.year}></TimeBar>
      <Layout>
        <Row>
          <Col span={8}>
            <SideMenu></SideMenu>
          </Col>
          <Col span={16}>
            <ArticleContent></ArticleContent>
          </Col>
        </Row>

        {/* <Layout>
          <Sider>
            <SideMenu></SideMenu>
          </Sider>
          <Content>
            <ArticleContent></ArticleContent>
          </Content>
        </Layout> */}
      </Layout>
    </>
  );
};

export default Main;

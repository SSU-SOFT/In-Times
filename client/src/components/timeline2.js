import React, { useState, useEffect } from "react";
import "../style/timeline.css";
import { Chrono } from "react-chrono";
import { Row, Col, Menu, Select, Button, Divider, Card, Typography,Modal } from "antd";

const { Title, Paragraph, Text, Link } = Typography;

const Timeline = () => {


  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [items, setitems] = useState([]);
  const [yearval, setyearval] = useState(2019);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const DropDownSelect = (value) => {
    //console.log(value);
    setyearval(value);
  };

  const SetData = (year) => {
    let tempitem = [];

    if (year === "2019") {
      for (let i = 0; i < 20; i++) {
        const temp = {
          title: "문희상",
          date: "2019-01-01",
          articles: [{
            title: "first article",
            content: "contentaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            image: 'http://img.hani.co.kr/imgdb/resize/2018/1231/00503152_20181231.JPG'
          }, {
            title: "Second article",
            content: "2content",
            image: 'https://pds.joins.com/news/component/htmlphoto_mmdata/201901/01/67bd461e-15e1-4c18-9143-71e9e4b9a283.jpg'
          },
          {
            title: "Second article",
            content: "2content",
            image: 'https://dimg.donga.com/wps/NEWS/IMAGE/2018/12/31/93504457.3.jpg'
          }],



        };

        tempitem.push(temp);
      }
    }
    if (year === "2020") {
      for (let i = 0; i < 20; i++) {
        const temp = {
          title: "교육",
          articles: [{
            title: "first article",
            content: "content",
            image: '//img.seoul.co.kr/img/upload/2019/12/31/SSI_20191231165940_O2.jpg'
          },
          {
            title: "second",
            content: "content",
            image: ''
          }, {
            title: "third",
            content: "content",
            image: 'http://image.kmib.co.kr/online_image/2019/1231/201912311745_11120924115091_1.jpg'
          }],

        };

        tempitem.push(temp);
      }
    }
    setitems(tempitem);
    tempitem = [];
  }


  useEffect(() => {
    SetData(yearval)
  }, [yearval]);

  useEffect(() => {
    SetData('2019')
  }, []);


  const gridStyle = {
    width: '25%',
    textAlign: 'center',
    height: "10vmax"
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
          {/* <Button onClick={OnGetClick}>Get</Button> */}
        </Row>
        <Divider></Divider>
        <Row className="timeline_row">
          <div className="timeline_visual">
            <Chrono
              items={items}
              mode="HORIZONTAL"
              allowDynamicUpdate
              cardPositionHorizontal='TOP'
              theme={{ primary: "rgba(0, 30, 165, 1)", secondary: "white" }}
              useReadMore="false"
            >
              {
                items.map((v) => {
                  return (
                    <div key={v} className="Card">
                      <div>
                        {v.title}
                      </div>
                      <div>
                        {v.date}
                      </div>
                      {v.articles.map((article) => {
                        return (
                          <>

                            <Card key={article} hoverable
                              className="articleCard" style={{

                                backgroundImage: "url(" + article.image + ")",
                              }} onClick={showModal}  >
                              <Row>
                                <Col span={12}>
                                  <div>
                                    <Title>
                                      {article.title}
                                    </Title>
                                  </div>
                                  <div>
                                    <Text>
                                      {article.content}
                                    </Text>

                                  </div>
                                </Col>
                                <Col span={12}>
                                  <div>
                                  </div>
                                </Col>
                              </Row>

                            </Card>
                          </>)
                      })}
                      {/* <Card style={{width:"60vmax"}}>
                        {v.articles.map((article) => {
                          return (
                            <>
                              <Card.Grid key={article} hoverable
                                className="articleCard" style={gridStyle}>
                                <div>
                                  <img src={article.image}>
                                  </img>
                                  <div>
                                    {article.title}
                                  </div>
                                  <div>
                                    {article.content}
                                  </div>
                                </div>

                              </Card.Grid>
                            </>)
                        })}
                      </Card> */}
                    </div>
                  );
                })
              }
            </Chrono>
          </div>


        </Row>
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            hello
        </Modal>
      </div>
    </>
  );
};

export default Timeline;

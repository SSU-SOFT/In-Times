import React, { useState, useEffect } from "react";
import "../style/timeline.css";
import { Chrono } from "react-chrono";
import { Row, Col, Menu, Select, Button, Divider, Card, Typography, Modal } from "antd";
import axios from 'axios';
import instance from "../module/instance";

const { Title, Paragraph, Text, Link } = Typography;

var count = 0;

const Timeline = () => {


  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [items, setitems] = useState([]);
  const [yearval, setyearval] = useState('0');
  const [data, setdata] = useState([]);
  const [cInfo, setcInfo] = useState([]);
  const [selected, setselected] = useState(false);



  const lst = [];

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
    setselected(false)
    setyearval(value)
  };

  const getData = async () => {

    console.log('yearval:' + yearval)
    if (yearval === '2019') {
      setdata([])
      for (let i = 1; i < 51; i++) {
        instance.get('/news', { params: { cId: i } })
          .then(response => { setdata(data => [...data, response.data.newsInfo]) }) // SUCCESS
          .catch(response => { console.log(response) }); // ERROR

      }
      instance.get('/cluster')
        .then(response => { setcInfo(response.data.clusterInfo); }) // SUCCESS
        .catch(response => { console.log(response) }); // ERROR

    } else if (yearval === '2020') {
      setdata([])
    }

  }

  useEffect(() => {
    getData()
  }, [yearval]);


  const SetData = () => {
    setselected(true)
    if (data.length > 0) {
      let tempitem = [];

      if (yearval === '2019') {
        for (let i = 0; i < 50; i++) {

          let temptitle = cInfo[i].Topic.join(",");
          const temp = {
            title: temptitle,
            date: "2019-01-01",
            articles: data[i],
          };

          tempitem.push(temp);
        }

      }
      setitems(tempitem);
      tempitem = [];

    }else{
      setselected(false)
    }


  }



  const gridStyle = {
    width: '25%',
    textAlign: 'center',
    height: "10vmax"
  };


  return (
    <>
      <div className="timeline">
        <Row align="middle" justify="center" className="selectSection">
          <Select onChange={DropDownSelect} placeholder='Select Year' >
            <Option value="2019">2019</Option>
            <Option value="2020">2020</Option>
          </Select>
          {/* <div className="yearval">{yearval}</div> */}
          <Button onClick={SetData}>Get</Button>
        </Row>
        <Divider></Divider>
        {
          selected ?
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
                                  className="articleCard" style={
                                    article.img !== '/images/no-image.png' ?
                                      {
                                        backgroundImage: "url(" + article.img + ")",
                                      } : { backgroundImage: "url('')", }} onClick={showModal}  >
                                  <Row>
                                    <Col span={12}>
                                      <div>
                                        <Title>
                                          {article.headline}
                                        </Title>
                                      </div>
                                      <div>
                                        <Text>
                                          {article.text}
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

                        </div>
                      );
                    })
                  }
                </Chrono>
              </div>


            </Row>
            :
            <div>
            </div>
        }

        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          hello
        </Modal>
      </div>
    </>
  );
};

export default Timeline;

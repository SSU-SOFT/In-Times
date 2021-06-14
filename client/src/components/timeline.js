import React, { useState, useEffect } from "react";
import "../style/timeline.css";
import { Chrono } from "react-chrono";
import { Row, Col, Menu, Select, Button, Divider, Card, Typography, Modal, Image } from "antd";
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
  const [btndisable, setbtndisable] = useState(true);


  const DropDownSelect = (value) => {
    setselected(false)
    setyearval(value)
  };

  function date_ascending(a, b) {
    var dateA = new Date(a['date']).getTime();
    var dateB = new Date(b['date']).getTime();
    return dateA > dateB ? 1 : -1;
  };

  const getData = async () => {

    let nums = []

    if (yearval === '2019') {
      setdata([])


      await instance.get('/cluster')
        .then(response => { 
          let ordered = []
          ordered = response.data.clusterInfo
          ordered.sort(date_ascending)
          setcInfo(ordered)
          ordered.map(x=>nums.push(x.cId))
        }) // SUCCESS
        .catch(response => { console.log(response) }); // ERROR

    } else if (yearval === '2020') {
      setdata([])
    }

    console.log(nums)

    const results = nums.reduce((prevPrms, num) => (
      prevPrms.then(async prevRes => {
        const currRes = await instance.get('/news/?cId=' + num)
        return [...prevRes, currRes]
      })
    ), Promise.resolve([]))

    results.then(response => {
      console.log(response)
      setdata(response)
    })

    // await instance.get('/news/?cId=' + i)
    //   .then(response => { setdata(data => [...data, response.data.newsInfo]) }) // SUCCESS
    //   .catch(response => { console.log(response) }); // ERROR



  }


  useEffect(() => {
    getData()
    
  }, [yearval]);


  useEffect(() => {
    data.length>0? setbtndisable(false):setbtndisable(true)
  }, [data]);



  const SetData = () => {

    if (yearval !== '0') {
      console.log(data)
      console.log(cInfo)
      setselected(true)
      if (data.length > 0) {
        let tempitem = [];

        if (yearval === '2019') {
          for (let i = 0; i < 50; i++) {

            let temptitle = cInfo[i].Topic.join(",");
            let cloud = cInfo[i].img
            let date = cInfo[i].date
            const temp = {
              title: temptitle,
              img: cloud,
              articles: data[i].data.newsInfo,
              date:date
            };

            tempitem.push(temp);
          }

        }
        setitems(tempitem);
        tempitem = [];

      } else {
        setselected(false)
      }
    }



  }



  const gridStyle = {
    width: '25%',
    textAlign: 'center',
    height: "10vmax"
  };

  const OnHandleClick = (props) => {
    window.open(props.url);
  }


  return (
    <>
      <div className="timeline">
        <Row align="middle" justify="center" className="selectSection">
          <Select onChange={DropDownSelect} placeholder='Select Year' >
            <Option value="2019">2019</Option>
            <Option value="2020">2020</Option>
          </Select>
          {/* <div className="yearval">{yearval}</div> */}
          <Button onClick={SetData} disabled={btndisable}>Get</Button>
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
                >   
                <div className="chrono-icons">
                    <img src="http://www.the-pr.co.kr/news/photo/201607/14976_49069_3617.jpg" alt="image1" />
                </div>
                  {
                    items.map((v) => {
                      return (

                        <div key={v} className="Card">
                          <div className="clusterhead">
                            {v.title}
                          </div>
                          <div className="clusterdate">
                            {v.date}
                          </div>
                          <div>
                            <Image width={400} src={'http://13.209.70.51:5000' + v.img}>

                            </Image>
                          </div>
                          {v.articles.map((article) => {
                            return (
                              <>

                                <Card key={article} hoverable
                                  className="articleCard" style={
                                    article.img !== '/images/no-image.png' ?
                                      {
                                        backgroundImage: "url(" + article.img + ")",
                                      } : { backgroundImage: "url('http://www.the-pr.co.kr/news/photo/201607/14976_49069_3617.jpg')", }} onClick={() => OnHandleClick({ url: article.url })}  
                                      
                                      
                                      
                                      >

                                  <Row>
                                    <Col span={12}>
                                      <div>
                                        <Title style={{
                                          fontSize:"2em"
                                        }}>
                                          {article.headline}
                                        </Title>
                                      </div>
                                      <div>
                                        <Text>
                                          {article.text}...
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

      </div>
    </>
  );
};

export default Timeline;

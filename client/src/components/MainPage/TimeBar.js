import React, { useState, useEffect } from "react";
import "../../style/TimeBar.css";

import { useRecoilState } from "recoil";
import { yearState,cIdState,aIdState } from "../../state/state";

import { Steps, Divider, Select,Space } from "antd";

import axios from "axios";
import instance from "../../module/instance";

import TimeBarAsset from "./TimeBarAsset";

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: `element-${ind}` }));


const TimeBar = () => {
  const [year, setYear] = useRecoilState(yearState);
  const [cId, setCid] = useRecoilState(cIdState);
  const [aId, setAid] = useRecoilState(aIdState);

  const [currentVal, setCurrentVal] = useState(0);
  const [cInfo, setcInfo] = useState([]);
  const [items, setItems] = useState([]);

  const [firstcId,setFirstcId]=useState([]);
  
  const { Option } = Select;

  const MakeItem = () => {
    if (cInfo.length > 0) {
      let temp = [];
      for (let i = 0; i < cInfo.length; i++) {
        temp.push(<TimeBarAsset clusterInfo={cInfo[i]} key={cInfo[i].cId} firsts={firstcId} ></TimeBarAsset>);
      }
      setItems(temp);
    } else {
      setItems([]);
    }
  };

  const getData = async () => {
    await instance
        .get(`/api/cluster/${year}`)
        .then((response) => {
          let ordered = [];
          ordered = response.data.clusterInfo;
          ordered.sort(date_ascending);
          //console.log(ordered)

          let tempdate="";
          let tempfirst=[];

          ordered.map((v)=>{
            if(v.date.substring(5, 7)!=tempdate){
              tempdate=v.date.substring(5, 7);
              tempfirst.push(v.cId);
            }
          })

          setFirstcId(tempfirst);
          setCid(ordered[0].cId);
          setcInfo(ordered);
          //ordered.map(x => nums.push(x.cId));
          //cinfos = ordered;
        }) // SUCCESS
        .catch((response) => {
          console.log(response);
        }); // ERROR
    // if (year === 2019) {

      
    // } else if (year === 2020) {
    //   setcInfo([]);
    //   setItems([]);
    //   setCid(0);
    //   setAid(0);
    //   //setdata([])
    // }

    // console.log(cinfos)

    // const results = nums.reduce((prevPrms, num) => (
    //   prevPrms.then(async prevRes => {
    //     const currRes = await instance.get('api/news/?cId=' + num)
    //     return [...prevRes, currRes]
    //   })
    // ), Promise.resolve([]))

    // results.then(response => {

    //   // temp=response
    //   // temp.map((x)=>datas.push(x))
    //   setdata(response)
    // })
  };

  
  useEffect(() => {
    getData();
  }, [year]);

  useEffect(() => {
    if(cInfo.length>0){

        MakeItem();
    } 
  }, [cInfo]);


  const date_ascending = (a, b) => {
    var dateA = new Date(a["date"]).getTime();
    var dateB = new Date(b["date"]).getTime();
    return dateA > dateB ? 1 : -1;
  };

  //   const OnClickIndex = (index) => {
  //     setPrevIndex(indexval);
  //     setIndexval(index);
  //   };

  const DropDownSelect = (value) => {
    setYear(value);
  };

  return (
    <>
      <div className="TimeBarMain">
      <div className="SetYearArea">
          <Select onChange={DropDownSelect} defaultValue={year}>
            <Option value={2019}>2019</Option>
            <Option value={2020}>2020</Option>
            <Option value={2021}>2021</Option>
          </Select>
        </div>
        <Space className="TimeBarStep">
          {items.map((v,i) => v)}

          {/* <Steps progressDot current={currentVal} onChange={onChange}>
            {items.map((v) => {
              return (
                <>
                  <Step description="This is a description." />
                </>
              );
            })}
          </Steps> */}
        </Space>
    
        {/* <Divider></Divider> */}
      </div>
    </>
  );
};

export default TimeBar;

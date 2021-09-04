import React, { useState, useEffect } from "react";
import "../../style/TimeBar.css";

import { useRecoilState } from "recoil";
import { yearState,cIdState,aIdState } from "../../state/state";

import { Steps, Divider, Select } from "antd";

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
  
  const { Option } = Select;

  const MakeItem = () => {
    if (cInfo.length > 0) {
      let temp = [];
      for (let i = 0; i < cInfo.length; i++) {
        temp.push(<TimeBarAsset clusterInfo={cInfo[i]}></TimeBarAsset>);
      }
      setItems(temp);
    } else {
      setItems([]);
    }
  };

  const getData = async () => {
    let nums = [];

    let datas = [];
    let cinfos = [];

    if (year === 2019) {
      //setdata([])

      await instance
        .get("/api/cluster")
        .then((response) => {
        console.log("Get Data!!!!!!!!");
          let ordered = [];
          ordered = response.data.clusterInfo;
          ordered.sort(date_ascending);

          setCid(ordered[0].cId);
          setcInfo(ordered);
          //ordered.map(x => nums.push(x.cId));
          //cinfos = ordered;
        }) // SUCCESS
        .catch((response) => {
          console.log(response);
        }); // ERROR
    } else if (year === 2020) {
      setcInfo([]);
      setItems([]);
      setCid(0);
      setAid({});
      //setdata([])
    }

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
        console.log("cinfo:",cInfo);
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
        <div className="TimeBarStep">
          {items.map((v) => v)}

          {/* <Steps progressDot current={currentVal} onChange={onChange}>
            {items.map((v) => {
              return (
                <>
                  <Step description="This is a description." />
                </>
              );
            })}
          </Steps> */}
        </div>
        <div className="SetYearArea">
          <Select onChange={DropDownSelect} defaultValue={2019}>
            <Option value={2019}>2019</Option>
            <Option value={2020}>2020</Option>
          </Select>
        </div>
        {/* <Divider></Divider> */}
      </div>
    </>
  );
};

export default TimeBar;

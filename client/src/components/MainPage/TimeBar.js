import React, { useState, useEffect } from "react";
import "../../style/TimeBar.css";

import { useRecoilState } from "recoil";
import { yearState,cIdState } from "../../state/state";

import {  Select,Space } from "antd";

import instance from "../../module/instance";

import TimeBarAsset from "./TimeBarAsset";



const TimeBar = () => {
  const [year, setYear] = useRecoilState(yearState);
  const [cId, setCid] = useRecoilState(cIdState);
 

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

          let tempdate="";
          let tempfirst=[];

          ordered.map((v,i)=>{
            if(v.date.substring(5, 7)!==tempdate){
              tempdate=v.date.substring(5, 7);
              tempfirst.push(v.cId);
            }
            return(<></>);
          })

          setFirstcId(tempfirst);
          setCid(ordered[0].cId);
          setcInfo(ordered);

        }) // SUCCESS
        .catch((response) => {
          console.log(response);
        }); // ERROR


  };

  
  useEffect(() => {
    getData();
    return ()=>{
      handleScroll();
    };
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


  const DropDownSelect = (value) => {
    setYear(value);
  };

  const handleScroll = () => {
    document.getElementsByClassName("ant-space")[0].scrollTo(0, 0)
  };

  return (
    <>
      <div className="TimeBarMain">
      <div className="SetYearArea">
          <Select onChange={DropDownSelect} defaultValue={year} value={year}>
            <Option value={2019}>2019</Option>
            <Option value={2020}>2020</Option>
            <Option value={2021}>2021</Option>
          </Select>
      </div>

         <Space className="TimeBarStep" >

            {items.map((v,i) => v)}
        </Space>

       
      </div>
    </>
  );
};

export default TimeBar;

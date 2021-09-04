import React, { useState,useEffect } from "react";
import "../../style/TimeBar.css";

import { useRecoilState } from "recoil";
import { yearState } from "../../state/state";
import { cIdState } from "../../state/state";

import { Steps, Divider } from "antd";

import axios from 'axios';
import instance from "../../module/instance";

import TimeBarAsset from "./TimeBarAsset";



const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: `element-${ind}` }));

const { Step } = Steps;

const TimeBar = () => {
  const [year, setYear] = useRecoilState(yearState);
  const [currentVal, setCurrentVal] = useState(0);
  const [cInfo, setcInfo] = useState([]);
  const [items, setItems] =useState([]);
  const [cId, setCid ] = useRecoilState(cIdState);

    const MakeItem=()=>{
        
        if(cInfo.length>0){
            setCid(cInfo[0].cId);
            let temp=[];
            for(let i=0;i<cInfo.length;i++){
                let cnum=cInfo[i].cId;
                temp.push(<TimeBarAsset cId={cnum}></TimeBarAsset>);
            }
            setItems(temp);
        }
    }


  const getData = async () => {

    let nums = []

    let datas = []
    let cinfos = []

    if (year === 2019) {
      //setdata([])

      await instance.get('/api/cluster')
        .then(response => {
          let ordered = [];
          ordered = response.data.clusterInfo;
          ordered.sort(date_ascending);
          setcInfo(ordered);
          //ordered.map(x => nums.push(x.cId));
          //cinfos = ordered;
        }) // SUCCESS
        .catch(response => { console.log(response) }); // ERROR

    } else if (year === 2020) {
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

  }

  useEffect(() => {
    getData()
  }, [year]);


  useEffect(() => {
    console.log(cInfo);
    MakeItem();
  }, [cInfo]);

  useEffect(() => {
    console.log(items);
  }, [items]);
  //   const EXAMPLE = [
  //     {
  //       data: "2018-03-22",
  //       status: "status",
  //       statusB: "Ready for Dev",
  //       statusE: "In Progress",
  //     },
  //     {
  //       data: "2018-03-23",
  //       status: "status",
  //       statusB: "In Progress",
  //       statusE: "Done",
  //     },
  //   ];

  const date_ascending = (a, b) => {
    var dateA = new Date(a["date"]).getTime();
    var dateB = new Date(b["date"]).getTime();
    return dateA > dateB ? 1 : -1;
  };

  //   const OnClickIndex = (index) => {
  //     setPrevIndex(indexval);
  //     setIndexval(index);
  //   };

  const onChange = (current) => {
    console.log("onChange:", current);
    setCurrentVal(current);
  };

  

  return (
    <>
      <div className="TimeBarMain">
        <div>setYear</div>
        <div className="TimeBarStep">


            {
                items.map((v)=>v)
            }

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

        {/* <Divider></Divider> */}
      </div>
    </>
  );
};

export default TimeBar;

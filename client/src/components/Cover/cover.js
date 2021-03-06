import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import { yearState } from "../../state/state";

import "../../style/cover.css";
const Cover = () => {
  const section = useRef(null);

  const [year, setYear] = useRecoilState(yearState);

  const scrollTo = (ref) => {
    window.scroll({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  };

  const OnClickYear = (e) => {
    scrollTo(section);
    setYear(e);
  };

  return (
    <>
      <div className="CoverBox">
        <div className="CoverContent">
        <div className="circle2">
          </div>
          <div className="circle">
            <div className="logo">
              <div>INTIMES</div>
              <div className="sublogo">Korea News TImeLine Service</div>
            </div>
            <div className="logo_back">
              <div id="header">INTIMES란?</div>
              <div id="content">
                InTimes는 뉴스 빅데이터에서 중요한 사건들을 자동으로 탐지하고,
                 사건에 해당하는 뉴스 기사들을 모아 보여주는 웹 사이트 입니다.
                 <br/>
                 <br/>
                 사용하려면 로고 주변의 연도를 눌러보세요!
                 </div>
            </div>
          </div>

          <div id="outer-orbit">
            <div className="outer-orbit-cirlces1">
              <div className="YearLink" onClick={() => OnClickYear(2019)}>
                2019
              </div>
            </div>
          </div>

          <div id="outer-orbit2">
            <div className="outer-orbit-cirlces2">
              <div className="YearLink" onClick={() => OnClickYear(2020)}>
                2020
              </div>
            </div>
          </div>

          <div id="outer-orbit3">
            <div className="outer-orbit-cirlces3">
              <div className="YearLink" onClick={() => OnClickYear(2021)}>
                2021
              </div>
            </div>
          </div>
        </div>
        <div className="background"></div>
      </div>
      <div ref={section}></div>
    </>
  );
};

export default Cover;

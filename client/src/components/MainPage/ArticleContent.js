import React, { useEffect, useState } from "react";
import "../../style/ArticleContent.css";
import { useRecoilState } from "recoil";
import { cIdState, yearState, aIdState, InfoState } from "../../state/state";
import axios from "../../module/instance";
import Tag from "./Tag";

import {  Divider } from "antd";
import ClusterInfo from "./ClusterInfo";
import { AiFillCloseCircle } from "react-icons/ai";

const ArticleContent = () => {

  const [aId, setAid] = useRecoilState(aIdState);
  const [isInfo, setIsinfo] = useRecoilState(InfoState);

  const [article, setArticle] = useState({});
 


  const getArticles = async () => {
    if (aId !== 0) {
      await axios
        .get(`/api/news/${aId}`)
        .then((response) => {
          let news = response.data.newsInfo[0];
          news.category = news.category.replace(/\s/g, "").split(",");
          setArticle(news);
        }) // SUCCESS
        .catch((response) => {
          console.log(response);
        }); // ERROR
    } else {
      setArticle({});
    }
  };



  useEffect(() => {
    getArticles();
  }, [aId]);

  const OnCloseClick = () => {
    setIsinfo(true);
  };


  return (
    <>
      <div className="ArticleBox">
        {isInfo ? (
          <ClusterInfo></ClusterInfo>
        ) : (
          <div>
            <div className="Xbutton">
              <div onClick={OnCloseClick}>
                <AiFillCloseCircle />
              </div>
            </div>

            <div >{article.date}</div>
            <div className="header">
              <h3 style={{ fontWeight: "bold", margin: "0px" }}>
                {article.press}
              </h3>
              <div style={{ display: "flex" }}>
                {article.category != null
                  ? article.category.map((el, i) => <Tag key={i}>{el}</Tag>)
                  : null}
              </div>
            </div>
            <div className="headline">
              <h1
                style={{
                  fontWeight: "600",
                }}
              >
                {article.headline}
              </h1>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div
                  className="btn"
                  onClick={() => window.open(article.url, "_blank")}
                >
                  ?????? ?????? ?????? ?????? ???
                </div>
              </div>
            </div>
            <Divider
              style={{
                marginBottom: "2px",
                marginTop: "2px",
              }}
            />
            <div className="content">
              <div style={{ display: "flex", justifyContent: "center" }}>
                {article.img !== "/images/no-image.png" ? (
                  <>
                    <img src={article.img}></img>
                  </>
                ) : null}
              </div>
              <div className="text">{article.text}</div>
            </div>
          </div>
        )}


      </div>
    </>
  );
};

export default ArticleContent;

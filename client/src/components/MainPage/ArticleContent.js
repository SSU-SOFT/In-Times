import React, { useEffect, useState } from "react";
import "../../style/ArticleContent.css";
import { useRecoilState } from "recoil";
import { cIdState, yearState, aIdState } from "../../state/state";
import axios from "../../module/instance";
import Tag from "./Tag";
import { Divider } from "antd";

const ArticleContent = () => {
  const [year, setYear] = useRecoilState(yearState);
  const [cId, setCid] = useRecoilState(cIdState);
  const [aId, setAid] = useRecoilState(aIdState);

  const [article, setArticle] = useState({});

  const getArticles = async () => {
    if (aId != 0) {
      await axios
        .get(`/api/news/${aId}`)
        .then((response) => {
          //console.log("aid", response.data.newsInfo[0]);
          let news = response.data.newsInfo[0];
          news.category = news.category.split(",");
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

  return (
    <>
      <div className="ArticleBox">
        <div>{article.date}</div>
        <div className="header">
          <h3 style={{ fontWeight: "bold", margin: "0px" }}>{article.press}</h3>
          <div style={{ display: "flex" }}>
            {article.category != null
              ? article.category.map((el, i) => <Tag key={i}>{el}</Tag>)
              : null}
          </div>
        </div>
        <div className="headline">
          <h1 style={{
            fontWeight:"600"
          }}>{article.headline}</h1>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div className="btn" onClick={()=>window.open(article.url,'_blank')}>
              원문 기사 보러 가기 →
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
            {article.img !="/images/no-image.png" ? (
              <>
                <img src={article.img}></img>
              </>
            ) : null}
          </div>
          <div className="text">{article.text}</div>
        </div>
      </div>
    </>
  );
};

export default ArticleContent;

import React, { useEffect, useState } from "react";
import "../../style/ArticleContent.css";
import { useRecoilState } from "recoil";
import { cIdState, yearState, aIdState } from "../../state/state";
import axios from "../../module/instance";
import Tag from './Tag';
import {Divider,} from 'antd';

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
          console.log("aid", response.data.newsInfo[0]);
          const news = response.data.newsInfo[0];
          news.category = news.category.split(",");
          setArticle(news);
        }) // SUCCESS
        .catch((response) => {
          console.log(response);
        }); // ERROR
    }else{
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
          <h3 style={{fontWeight:"bold", margin:'0px'}}>{article.press}</h3>
          <div style={{display:"flex"}}>
            {article.category.map((el, i)=> <Tag key={i}>{el}</Tag>)}
          </div>
        </div>
        <div className="headline">
          <h1>{article.headline}</h1>
          <div style={{display:'flex', justifyContent:'flex-end'}}>
            <a className="btn" href={article.url}>원문 기사 보러 가기 →</a>
          </div>
        </div>
        <Divider style={{
            marginBottom: "2px",
            marginTop: "2px",
          }}/>
        <div className="content">
          <div style={{display:"flex", justifyContent:'center'}}>
            <img src={article.img}></img>
          </div>
          <p>{article.text}</p>
        </div>
        
      </div>
    </>
  );
};

export default ArticleContent;

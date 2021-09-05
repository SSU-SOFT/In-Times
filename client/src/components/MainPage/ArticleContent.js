import React, { useEffect, useState } from "react";
import "../../style/ArticleContent.css";
import { useRecoilState } from "recoil";
import { cIdState, yearState, aIdState } from "../../state/state";
import axios from "../../module/instance";
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
          setArticle(response.data.newsInfo[0]);
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
        <div>{article.category}</div>
        <div>{article.press}</div>
        <div>{article.headline}</div>
        <div>{article.text}</div>
        <div>{article.url}</div>
        <div>
          <img src={article.img} width="50%"></img>
        </div>
      </div>
    </>
  );
};

export default ArticleContent;

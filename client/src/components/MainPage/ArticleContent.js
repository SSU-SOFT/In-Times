import React, { useEffect, useState } from "react";
import "../../style/ArticleContent.css";
import { useRecoilState } from "recoil";
import { cIdState, yearState, aIdState } from "../../state/state";
import axios from "../../module/instance";
import Tag from "./Tag";
import comment_icon from "../../assets/icons/comment.png";
import {Modal, Divider } from "antd";

const ArticleContent = () => {
  const [year, setYear] = useRecoilState(yearState);
  const [cId, setCid] = useRecoilState(cIdState);
  const [aId, setAid] = useRecoilState(aIdState);

  const [article, setArticle] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
          <div style={{ display: "flex", justifyContent: "flex-end" }} onClick={()=>window.open(article.url,'_blank')}>
            <div className="btn">
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
        <div style={{position:"sticky", float:'right', bottom:'0', width:'50px', height:'50px'}} onClick={()=>{setIsModalVisible(true);}}>
          <img src={comment_icon} width={50} height={50}/>
        </div>
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    </>
  );
};

export default ArticleContent;

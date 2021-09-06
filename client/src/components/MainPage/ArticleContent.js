import React, { useEffect, useState } from "react";
import "../../style/ArticleContent.css";
import { useRecoilState } from "recoil";
import { cIdState, yearState, aIdState, InfoState } from "../../state/state";
import axios from "../../module/instance";
import Tag from "./Tag";
import comment_icon from "../../assets/icons/comment.png";
import { Modal, Divider } from "antd";
import ClusterInfo from "./ClusterInfo";

const ArticleContent = () => {
  const [year, setYear] = useRecoilState(yearState);
  const [cId, setCid] = useRecoilState(cIdState);
  const [aId, setAid] = useRecoilState(aIdState);
  const [isInfo, setIsinfo] = useRecoilState(InfoState);

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

  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  useEffect(() => {
    getArticles();
  }, [aId]);

  return (
    <>
      <div className="ArticleBox">
        {isInfo ? (
          <ClusterInfo></ClusterInfo>
        ) : (
          <div>
            <div>{article.date}</div>
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
                {article.img != "/images/no-image.png" ? (
                  <>
                    <img src={article.img}></img>
                  </>
                ) : null}
              </div>
              <div className="text">{article.text}</div>
            </div>
          </div>
        )}
        <div
          style={{
            position: "sticky",
            float: "right",
            bottom: "0",
            width: "50px",
            height: "50px",
          }}
          onClick={() => {
            setIsModalVisible(true);
          }}
        >
          <img src={comment_icon} width={50} height={50} />
        </div>
      </div>
    </>
  );
};

export default ArticleContent;

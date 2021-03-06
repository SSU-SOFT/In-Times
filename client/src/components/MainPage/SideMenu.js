import React, { useState, useEffect } from "react";
import "../../style/SideMenu.css";
import { useRecoilState } from "recoil";
import { cIdState, aIdState,InfoState  } from "../../state/state";
import { Pagination, Card } from "antd";
import Tag from "./Tag";
import axios from "../../module/instance";

const SideMenu = () => {

  const [cId, setCid] = useRecoilState(cIdState);
  const [aId, setAid] = useRecoilState(aIdState);
  const [isInfo, setIsinfo] = useRecoilState(InfoState);


  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const handleScroll = () => {
    document.getElementById("SideRoot").scrollTo(0, 0);
  };

  useEffect(() => {
    getNews(cId, page, 20);
    handleScroll();
    return () => {};
  }, [page]);

  useEffect(() => {
    setPage(1);

    if (cId !== 0) {
      getNews(cId, page, 20);
    } else {
      setNews([]);
    }
  }, [cId]);

  const getNews = async (cId, page, pageSize) => {
    if (cId === 0) return;
    //console.log(cId, page);
    await axios
      .get(`/api/news?cId=${cId}&page=${page}`)
      .then((response) => {
        setAid(response.data.newsInfo[0].aId);
        setNews(response.data.newsInfo);
        setTotalPage(Math.ceil(response.data.newsCount / 20) * 10);
      }) // SUCCESS
      .catch((response) => {
        console.log(response);
      }); // ERROR
  };

  const onChange = (page) => {
    //console.log(`Page #${page}`);
    setPage(page);
  };

  const OnClickArticle = (aidnum) => {
    setAid(aidnum);
    setIsinfo(false);
  };

  return (
    <>
      <div className="SideMenu">
        <div
          style={{ overflow: "auto", height: "700px" }}
          className="SideMenuWrap"
          id="SideRoot"
        >
          {news.map((el) => {
            const categories = el.category.split(",");
            return (
              <Card
                hoverable
                className="ArticleCard"
                key={el.aId}
                onClick={() => OnClickArticle(el.aId)}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3 style={{ fontWeight: "bold", margin: "0px" }}>
                    {el.press}
                  </h3>
                  <div style={{ display: "flex" }}>
                    {categories.map((el, i) => {
                      return <Tag key={i}>{el}</Tag>;
                    })}
                  </div>
                </div>
                <h2 className="Headline">{el.headline}</h2>
                <div style={{ textAlign: "right" }}>{el.date}</div>
              </Card>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "center"}}>
          <Pagination
            simple
            defaultCurrent={1}
            total={totalPage}
            onChange={onChange}
            current={page}
          />
        </div>
      </div>
    </>
  );
};

export default SideMenu;

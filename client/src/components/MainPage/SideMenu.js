import React, {useState, useEffect} from 'react'
import "../../style/SideMenu.css";
import { useRecoilState} from 'recoil';
import { cIdState, yearState,aIdState } from "../../state/state";
import {Pagination,Card} from 'antd';

import axios from "../../module/instance";

const SideMenu=()=>{
    const [year,setYear]=useRecoilState(yearState);
    const [cId, setCid ] = useRecoilState(cIdState);
    const [aId, setAid ] = useRecoilState(aIdState);
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage , setTotalPage] = useState(0);

    useEffect(() => {
        console.log('컴포넌트가 화면에 나타남');
        getNews(cId, page, 20);
        return () => {
          console.log('컴포넌트가 화면에서 사라짐');
        };
    }, [page]);

    useEffect(() => {
        setPage(1);
        if(cId!=0){
            getNews(cId, page, 20);
        }else{
            setNews([])
        }
        
    }, [cId]);

    const getNews = async(cId, page, pageSize) => {
        if(cId === 0)
            return ;
        console.log(cId, page);
        await axios.get(`/api/news?cId=${cId}&page=${page}`)
        .then((response) => {
            console.log(Math.ceil(response.data.newsCount/20));
            setAid(response.data.newsInfo[0])
            setNews(response.data.newsInfo);
            setTotalPage(Math.ceil(response.data.newsCount/20)*10);
          }) // SUCCESS
          .catch((response) => {
            console.log(response);
          }); // ERROR

        // setNews(result.data.newsInfo);
        // console.log(result.data.newsInfo)
    }

    const onChange = (page) => {
        console.log(`Page #${page}`);
        setPage(page)
    }

    const OnClickArticle=(el)=>{
        setAid(el);
    }

    return(
        <>
        <div className="SideMenu">
            <div style={{overflow:'auto', height:'700px'}}>
                    {news.map((el)=>{
                        return (
                        <Card hoverable className="ArticleCard" key={el.aId} onClick={()=>OnClickArticle(el)}>
                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                <div>{el.press}</div>
                                <div>{el.category}</div>
                            </div>
                            <h4>{el.headline}</h4>
                            {el.date}
                        </Card>);
                    })}
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
                <Pagination simple defaultCurrent={1} total = {20} onChange={onChange} current={page}/>
            </div>
        </div>
        </>
    );
}

export default SideMenu;
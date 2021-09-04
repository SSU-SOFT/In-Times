import React, {useState, useEffect} from 'react'
import "../../style/SideMenu.css";
import { useRecoilState} from 'recoil';
import { cIdState, yearState } from "../../state/state";
import {Pagination} from 'antd';

import axios from "../../module/instance";

const SideMenu=()=>{
    const [year,setYear]=useRecoilState(yearState);
    const [cId, setCid ] = useRecoilState(cIdState);
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    
    useEffect(() => {
        console.log('컴포넌트가 화면에 나타남');
        getNews(cId);
        return () => {
          console.log('컴포넌트가 화면에서 사라짐');
        };
    }, [cId]);

    useEffect(() => {
        console.log('컴포넌트가 화면에 나타남');
        getNews(cId, page, 20);
        return () => {
          console.log('컴포넌트가 화면에서 사라짐');
        };
    }, [page]);

    const getNews = async(cId = 1, page = 1, pageSize = 20) => {
        console.log(cId, page);
        const result = await axios.get(`/api/news`, {
            params : {
                cId : cId,
                page : page
            }
        })
        setNews(result.data.newsInfo);
        console.log(result.data.newsInfo)
    }

    const onChange = (page) => {
        console.log(`Page #${page}`);
        setPage(page)
    }

    return(
        <>
        <div style={{}}>
            <div style={{overflow:'auto', height:'700px'}}>
                <ul>
                    {news.map((el)=>{
                        return (
                        <li style={{backgroundColor:"lightgrey", margin:'10px'}} key={el.aId}>
                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                <div>{el.category}</div>
                                <div>{el.press}</div>
                            </div>
                            <h4>{el.headline}</h4>
                        </li>);
                    })}
                </ul>
            </div>
            <div style={{backgroundColor:'skyblue', display:'flex', justifyContent:'center'}}>
                <Pagination simple defaultCurrent={1} total = {500} onChange={onChange}/>
            </div>
        </div>
        </>
    );
}

export default SideMenu;
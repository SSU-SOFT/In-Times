import React, {useState, useEffect} from 'react'
import "../../style/SideMenu.css";
import { useRecoilState} from 'recoil';
import { cIdState } from "../../state/state";
import { yearState } from "../../state/state";
import axios from "../../module/instance";

const SideMenu=()=>{
    const [year,setYear]=useRecoilState(yearState);
    const [cId, setCid ] = useRecoilState(cIdState);
    const [news, setNews] = useState([]);

    useEffect(async() => {
        console.log('컴포넌트가 화면에 나타남');
        const news = await axios.get(`/api/news?cId=${1}`);
        setNews(news.data.newsInfo);
        return () => {
          console.log('컴포넌트가 화면에서 사라짐');
        };
    }, []);

    return(
        <>
        <div style={{display:'flex'}}>
            <div style={{flex:1, overflow:'auto', height:'700px'}}>
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
        </div>
        </>
    );
}

export default SideMenu;
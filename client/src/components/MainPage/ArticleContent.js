import React from 'react'
import "../../style/ArticleContent.css";
import { useRecoilState} from 'recoil';
import { cIdState, yearState,aIdState } from "../../state/state";

const ArticleContent=()=>{

    const [year,setYear]=useRecoilState(yearState);
    const [cId, setCid ] = useRecoilState(cIdState);
    const [aId, setAid ] = useRecoilState(aIdState);


    return(
        <>
        <div className="ArticleBox">
            {/* <div>
                {aId.date}
            </div>
            <div>
                {aId.category}
            </div>
            <div>
                {aId.press}
            </div>
            <div>
                {aId.headline}
            </div>
            <div>
                {aId.text}
            </div>
            <div>
                {aId.url}
            </div>
            <div>
                <img src={aId.img} width="50%"></img>
            </div> */}
            
        </div>
        
        </>
    );
}

export default ArticleContent;
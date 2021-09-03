import React from 'react'
import "../../style/TimeBar.css";
import { useRecoilState} from 'recoil';
import { yearState } from "../../state/state";

const TimeBar=()=>{

    const [year,setYear]=useRecoilState(yearState);

    const date_ascending=(a, b)=> {
        var dateA = new Date(a['date']).getTime();
        var dateB = new Date(b['date']).getTime();
        return dateA > dateB ? 1 : -1;
    };

    return(
        <>
        TimeBar {year}
        </>
    );
}

export default TimeBar;
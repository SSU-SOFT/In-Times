import React from 'react'
import "../../style/SideMenu.css";
import { useRecoilState} from 'recoil';
import { yearState } from "../../state/state";

const SideMenu=()=>{

    const [year,setYear]=useRecoilState(yearState);

    return(
        <>
        SideMenu {year}
        </>
    );
}

export default SideMenu;
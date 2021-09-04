import React from 'react'
import "../../style/SideMenu.css";
import { useRecoilState} from 'recoil';
import { cIdState } from "../../state/state";
import { yearState } from "../../state/state";

const SideMenu=()=>{

    const [year,setYear]=useRecoilState(yearState);
    const [cId, setCid ] = useRecoilState(cIdState);

    return(
        <>
        SideMenu {year}, {cId}
        </>
    );
}

export default SideMenu;
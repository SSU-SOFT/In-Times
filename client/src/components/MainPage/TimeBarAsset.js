import React from 'react'
import "../../style/TimeBarAsset.css";
import { cIdState } from "../../state/state";
import { useRecoilState} from 'recoil';

const TimeBarAsset=(props)=>{
    const [cId, setCid ] = useRecoilState(cIdState);

    const OnClickAsset=()=>{
        setCid(props.cId)
    }

    return(
        <>
            <div className="TimeBarAsset" onClick={OnClickAsset}>
                {props.cId}
            </div>
        </>
    );
}

export default TimeBarAsset;
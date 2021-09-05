import React from 'react'
import SideMenu from './SideMenu';

const type = ["정치", "경제", "사회", "문화" ,"국제" ,"지역", "스포츠", "IT_과학"]
const color = ['#379392', "#4FB0C6",'#4F86C6','#FFBC42','#D81159', '#6C49B8', '#8F2D56','#218380']

const Tag = ({children}) => {
    return (
      <>
        <div className='Tags' style={{color:'white', backgroundColor:color[type.indexOf(children)]}}>
          {children}
        </div>
      </>
    );
  };
  
  export default Tag;
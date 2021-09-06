import React from 'react'
import '../../style/Comment.css'
import {Dropdown, Modal} from 'antd';

const Comment = ({children}) => {

    const menu = (
        <div>
            <button onClick={()=>{alert('수정')}}>수정</button>
            <button onClick={()=>{alert('삭제')}}>삭제</button>
        </div>
    );    

    return (
      <div className="Comment">
            <div className="Container">
                <div className="Content">
                    {children.comment}
                </div>
                <div className="Footer">
                    <h3>By. {children.nickname}</h3>
                    <Dropdown overlay={menu} placement={'topRight'}>
                        <button>
                            버튼
                        </button>
                    </Dropdown>
                </div>
            </div>
      </div>
    );
  };
  
  export default Comment;
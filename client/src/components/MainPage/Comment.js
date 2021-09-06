import React,{useState} from "react";
import "../../style/Comment.css";
import { Dropdown, Modal,Input } from "antd";
import instance from '../../module/instance'
const Comment = ({ children, onUpdate }) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isReviseModalVisible, setIsReviseModalVisible] = useState(false);
  const [nickname, setNickname] = useState(children.nickname);
  const [pw, setPW] = useState("");
  const [commentText, setCommentText] = useState(children.comment);
  const { TextArea } = Input;

  const menu = (
    <div>
      <button
        onClick={() => {
            setIsDeleteModalVisible(false);
            setIsReviseModalVisible(true);
        }}
      className="MemoMenu">
        수정
      </button>
      <button
        onClick={() => {
          setIsDeleteModalVisible(true);
          setIsReviseModalVisible(false);
        }}
        className="MemoMenu">
        삭제
      </button>
    </div>
  );
  const RevisehandleOK = async() => {
    await instance.put(`/api/comment/${children.cmId}`, {
        nickname : nickname,
        pw : pw,
        comment : commentText
    }).then((res)=>{
      if (res.data.success){
        onUpdate();
        setNickname('');
        setPW('');
        setCommentText('');
      }
      else {
        alert("err");
      }
    }).catch((err)=>{
        console.log(err);
    })
    setIsReviseModalVisible(false);
  };
  const RevisehandleCancel = () => {
    setIsReviseModalVisible(false);
  };

  const DeletehandleOK = async() => {
    await instance.delete(`/api/comment/${children.cmId}`, {
      data:{
        pw : pw
      }
    }).then((res)=>{
      if (res.data.success){
        onUpdate();
        setNickname('');
        setPW('');
        setCommentText('');
      }
      else {
        alert("err");
      }
  }).catch((err)=>{
      console.log(err);
  })
    setIsDeleteModalVisible(false);
  };
  const DeletehandleCancel = () => {
    setIsDeleteModalVisible(false);
  };

  return (
    <div className="Comment">
      <div className="Container">
        <div className="Content">{children.comment}</div>
        <div className="Footer">
          <h3>By. {children.nickname}</h3>
          <Dropdown overlay={menu} placement={"topRight"} trigger={['click']}>
            <button className="MemoMenu">Menu</button>
          </Dropdown>
        </div>
      </div>

      <Modal
          visible={isDeleteModalVisible}
          onCancel={DeletehandleCancel}
          footer={
            <div className="ModealFooter">
              <div onClick={DeletehandleCancel} className="button">
                취소
              </div>
              <div onClick={DeletehandleOK} className="button">
                확인
              </div>
            </div>
          }
          className="ModalRoot"
          title="삭제"
        >
          <Input.Password placeholder="비밀번호를 입력하세요" value={pw} onChange={(e)=>{setPW(e.target.value)}}/>
        </Modal>
        <Modal
          visible={isReviseModalVisible}
          onCancel={RevisehandleCancel}
          footer={
            <div className="ModealFooter">
              <div onClick={RevisehandleCancel} className="button">
                취소
              </div>
              <div onClick={RevisehandleOK} className="button">
                확인
              </div>
            </div>
          }
          className="ModalRoot"
          title="수정"
        >
            <div className="CommentInputArea">
            <Input placeholder="닉네임을 입력하세요" value={nickname} onChange={(e)=>{setNickname(e.target.value)}}/>
              <Input.Password placeholder="비밀번호를 입력하세요" value={pw} onChange={(e)=>{setPW(e.target.value)}}/>
              <TextArea placeholder="댓글을 입력하세요" value={commentText} onChange={(e)=>{setCommentText(e.target.value)}}></TextArea>
          </div>
        </Modal>
    </div>
  );
};

export default Comment;

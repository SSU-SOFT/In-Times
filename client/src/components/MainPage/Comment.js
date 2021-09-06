import React,{useState} from "react";
import "../../style/Comment.css";
import { Dropdown, Modal,Input } from "antd";

const Comment = ({ children }) => {

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isReviseModalVisible, setIsReviseModalVisible] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { TextArea } = Input;

  const handleChange = (e) => {
    setCommentText(e.target.value);
    console.log(e.target.value);
  };

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
  const RevisehandleOK = () => {
    setIsReviseModalVisible(false);
  };
  const DeletehandleOK = () => {
    setIsDeleteModalVisible(false);
  };

  const RevisehandleCancel = () => {
    setIsReviseModalVisible(false);
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
            삭제
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
            <TextArea onChange={handleChange} value={commentText}></TextArea>
          </div>
        </Modal>
    </div>
  );
};

export default Comment;

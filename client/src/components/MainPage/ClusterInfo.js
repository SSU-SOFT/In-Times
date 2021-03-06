import React, { useState, useEffect } from "react";
import { cIdState, yearState } from "../../state/state";
import { useRecoilState } from "recoil";
import comment_icon from "../../assets/icons/comment.png";
import instance from "../../module/instance";
import "../../style/ClusterInfo.css";
import { Space, Input, Modal, Divider } from "antd";
import Comment from "./Comment";
import Tag from "./Tag";

const config = require("../../config.json");
const ClusterInfo = () => {
  const [cId, setCid] = useRecoilState(cIdState);
  const [year, setYear] = useRecoilState(yearState);
  const [cinfo, setCinfo] = useState({});
  const [comments, setComments] = useState([]);

  const [nickname, setNickname] = useState("");
  const [pw, setPW] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const { TextArea } = Input;

  const handleOk = async () => {
    if (pw.length < 2 || nickname.length < 2 || commentText.length < 2) {
      if (pw.length < 2) {
        alert("비밀번호를 2자 이상 입력하세요!");
      }
      if (nickname.length < 2) {
        alert("이름을 2자 이상 입력하세요!");
      }
      if (commentText.length < 2) {
        alert("내용을 2자 이상 입력하세요!");
      }
    } else {
      await instance
        .post(`/api/comment/${cId}`, {
          nickname: nickname,
          pw: pw,
          comment: commentText,
        })
        .then((res) => {
          if (res.data.success) getComments();
          else alert("err");
        })
        .catch((err) => {
          console.log(err);
        });
      setIsAddModalVisible(false);
    }
  };

  const handleCancel = () => {
    setNickname("");
    setPW("");
    setCommentText("");
    setIsAddModalVisible(false);
  };

  const getData = async () => {
    if (cId !== 0) {
      instance
        .get(`/api/cluster/${year}/${cId}`)
        .then((response) => {
          setCinfo(response.data.clusterInfo[0]);
        }) // SUCCESS
        .catch((response) => {
          console.log(response);
        }); // ERROR
    }
  };

  const getComments = async () => {
    await instance
      .get(`/api/comment/${cId}`)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
    setNickname("");
    setPW("");
    setCommentText("");
  };

  useEffect(() => {
    getData();
    getComments();
  }, [cId]);

  return (
    <>
      <div className="ClusterInfoMain">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: "20px" }}>{cinfo.date}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            사건 기사 수 : {cinfo.count}
          </div>
          <div style={{ display: "flex", marginBottom: "1em" }}>
            {cinfo.category != null
              ? cinfo.category.map((el, i) => <Tag key={i}>{el}</Tag>)
              : null}
          </div>
        </div>
        <Divider
          style={{
            marginBottom: "10px",
            marginTop: "2px",
          }}
        />
        <div className="cinfocontent">
          <div style={{ display: "flex", justifyContent: "center" }}>
            {cinfo.img != null ? (
              <img
                src={config.server + ":5000" + cinfo.img}
                className="cinfoImg"
              ></img>
            ) : null}
          </div>
        </div>

        <Space
          style={{ padding: "10px", width: "100%", overflowX: "scroll" }}
          className="Memos"
        >
          {comments.map((el, i) => {
            return (
              <Comment onUpdate={getComments} key={i}>
                {el}
              </Comment>
            );
          })}
        </Space>
        <div
          style={{
            position: "sticky",
            float: "right",
            bottom: "0",
            width: "50px",
            height: "50px",
          }}
          onClick={() => {
            setIsAddModalVisible(true);
          }}
        >
          <img
            src={comment_icon}
            width={50}
            height={50}
            className="CommentButton"
          />
        </div>

        <Modal
          visible={isAddModalVisible}
          onCancel={handleCancel}
          footer={
            <div className="ModealFooter">
              <div onClick={handleOk} className="button">
                확인
              </div>
              <div onClick={handleCancel} className="button">
                취소
              </div>
            </div>
          }
          className="ModalRoot"
          title="댓글 입력"
        >
          <div className="CommentInputArea">
            <Input
              placeholder="닉네임을 입력하세요"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
            <Input.Password
              placeholder="비밀번호를 입력하세요"
              value={pw}
              onChange={(e) => {
                setPW(e.target.value);
              }}
            />
            <TextArea
              placeholder="댓글을 입력하세요"
              value={commentText}
              onChange={(e) => {
                setCommentText(e.target.value);
              }}
              maxLength={200}
            ></TextArea>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ClusterInfo;

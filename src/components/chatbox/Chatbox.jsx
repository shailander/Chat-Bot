import React, { useState, useEffect, useRef } from "react";
import { Col, Row } from "antd";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessage,
  sendUserRequest,
  setBotResponse,
} from "../../redux/actions";
import PulseLoader from "react-spinners/PulseLoader";

const Chatbox = (props) => {
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef) {
      divRef.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  const [msg, setMsg] = useState("");

  const { chatList, code } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    setMsg(target.value);
  };

  const handleKeyPress = async ({ key }) => {
    const currentKey = chatList.length;
    if (key === "Enter") {
      const chatMsg = {
        key: currentKey,
        userMessage: msg,
        botMessage: <PulseLoader color={"white"} size={10} />,
      };
      dispatch(
        sendMessage({
          ...chatMsg,
        })
      );
      setMsg("");
      const { data } = await sendUserRequest(code, msg);
      dispatch(
        setBotResponse({
          key: currentKey,
          botMessage: data,
        })
      );
    }
  };
  return (
    <>
      <Row>
        <Col offset={4} span={18} className="chat-box" ref={divRef}>
          {chatList.map((item) => (
            <ChatMessage
              key={item.key}
              userMessage={item.userMessage}
              botMessage={item.botMessage}
            />
          ))}
        </Col>
      </Row>
      <Row>
        <Col offset={4} span={18} className="user-box">
          <input
            value={msg}
            className="userinput-box"
            type="text"
            placeholder="Type Message Here"
            onChange={(e) => handleChange(e)}
            onKeyPress={(e) => handleKeyPress(e)}
          />
        </Col>
      </Row>
    </>
  );
};

export default Chatbox;

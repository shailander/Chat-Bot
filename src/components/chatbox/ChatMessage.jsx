import React from "react";
import { Col, Row } from "antd";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function ChatMessage({ userMessage, botMessage }) {
  return (
    <>
      <Row align="middle" style={{ marginTop: "30px" }}>
        <Col span={2} offset={1}>
          <AccountCircleIcon fontSize="large" />
        </Col>
        <Col span={4} offset={1} className="message">
          {userMessage}
        </Col>
      </Row>
      <Row align="middle" style={{ marginTop: "30px", marginBottom: "30px" }}>
        <Col span={4} offset={16} className="message">
          {botMessage}
        </Col>
        <Col span={2} offset={1}>
          <AccountCircleIcon fontSize="large" />
        </Col>
      </Row>
    </>
  );
}

export default ChatMessage;

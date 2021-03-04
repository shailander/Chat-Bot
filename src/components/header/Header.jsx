import React from "react";
import { Row, Col } from "antd";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function Header(props) {
  return (
    <Row align="middle" className="header2">
      <Col span={4}>
        <span className="header Text-Style">AI Playground</span>
      </Col>
      <Col span={2} offset={10}>
        <span className="header Text-Style2">Learn AI</span>
      </Col>
      <Col span={2}>
        <span className="header Text-Style2">Docs</span>
      </Col>
      <Col span={4}>
        <span className="header Text-Style2">
          <AccountCircleIcon
            fontSize="large"
            style={{ verticalAlign: "middle" }}
          />
          &nbsp;Account
        </span>
      </Col>
    </Row>
  );
}

export default Header;

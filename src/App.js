import Chatbox from "./components/chatbox/Chatbox";
import Editor from "./components/editor/Editor";
import Header from "./components/header/Header";
import { Row, Col } from "antd";

function App() {
  return (
    <>
      <Header />
      <Row className="container">
        <Col
          span={10}
          style={{
            border: "1px solid #2b2b2b",
          }}
        >
          <Editor />
        </Col>
        <Col span={14} style={{ border: "1px solid #2b2b2b" }}>
          <Chatbox />
        </Col>
      </Row>
    </>
  );
}

export default App;

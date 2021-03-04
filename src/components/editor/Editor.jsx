import React, { useState } from "react";
import { Row, Col, Select } from "antd";
import CodeEditor from "../editor/CodeEditor";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from "@material-ui/icons/Add";
import CachedIcon from "@material-ui/icons/Cached";

import { changeCodeEditor, setCode } from "../../redux/actions";

const Editor = () => {
  const { codeEditorList, code } = useSelector((state) => state);
  const [counter, setCounter] = useState(1);
  const [activeKey, setActiveKey] = useState("1");
  const [activeTab, setActiveTab] = useState(codeEditorList[0]);

  const dispatch = useDispatch();

  const add = () => {
    setCounter(counter + 1);
    const activeKey = `newTab${counter}`;
    const newTabsList = [...codeEditorList];
    newTabsList.push({
      title: `${activeKey}`,
      content: "//write your code here",
      key: activeKey,
    });
    dispatch(
      changeCodeEditor({
        codeEditorList: newTabsList,
      })
    );
  };

  const deleteTab = (e, targetKey) => {
    e.stopPropagation();
    let newActiveKey = activeKey;
    let lastIndex;
    codeEditorList.forEach((tab, i) => {
      if (tab.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newTabsList = codeEditorList.filter((tab) => tab.key !== targetKey);
    if (lastIndex >= 0) {
      newActiveKey = newTabsList[lastIndex].key;
    } else {
      newActiveKey = "1";
    }
    dispatch(
      changeCodeEditor({
        codeEditorList: newTabsList,
      })
    );
    selectTab(newActiveKey);
  };

  const selectTab = (targetKey) => {
    setActiveKey(targetKey);

    const activeTab = codeEditorList.filter((item) => item.key === targetKey);
    setActiveTab(activeTab[0]);
  };

  const handleEditorChange = (value) => {
    const newPanes = codeEditorList.map((item) => {
      if (item.key === activeKey) {
        return {
          ...item,
          content: value,
        };
      }
      return item;
    });
    dispatch(
      changeCodeEditor({
        codeEditorList: newPanes,
      })
    );
  };

  const handleApply = () => {
    if (activeKey === "1") {
      dispatch(
        setCode({
          code: codeEditorList[0].content,
        })
      );
    }
  };

  const buttonStyle = () =>
    codeEditorList[0].content === code
      ? "apply-changes-button"
      : "apply-changes-button apply-activate";

  return (
    <>
      <Row type="flex">
        <Col span={2}>
          <button className="tab-button" onClick={() => selectTab("1")}>
            main
          </button>
        </Col>
        <Col span={15} className="tabs-list">
          {codeEditorList.map((item) => {
            if (item.key !== "1")
              return (
                <button
                  key={item.key}
                  className="tab-button"
                  onClick={() => selectTab(item.key)}
                >
                  {item.title}
                  <ClearIcon
                    onClick={(e) => deleteTab(e, item.key)}
                    fontSize={"small"}
                    style={{ verticalAlign: "middle" }}
                  />
                </button>
              );
          })}
          <button className="tab-button">
            <AddIcon
              onClick={() => add()}
              fontSize={"small"}
              style={{ verticalAlign: "middle" }}
            />
          </button>
        </Col>
        <Col span={6}>
          <button className={buttonStyle()} onClick={() => handleApply()}>
            <CachedIcon
              fontSize={"small"}
              style={{ verticalAlign: "middle" }}
            />
            &nbsp;Apply Changes
          </button>
        </Col>
      </Row>
      <Row>
        <CodeEditor
          value={activeTab.content}
          defaultValue={activeTab.content}
          handleEditorChange={handleEditorChange}
        />
      </Row>
    </>
  );
};

export default Editor;

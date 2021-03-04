import React from "react";
import Editor from "@monaco-editor/react";

function CodeEditor({ value, handleEditorChange, defaultValue }) {
  return (
    <>
      <Editor
        height="80vh"
        theme="vs-dark"
        value={value}
        defaultLanguage="javascript"
        defaultValue={defaultValue}
        onChange={(e) => handleEditorChange(e)}
      />
    </>
  );
}

export default CodeEditor;

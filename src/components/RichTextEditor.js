import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function RichTextEditor({ editorState, setEditorState }) {
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}
      wrapperClassName="demo-wrapper"
      editorClassName="custom-editor"
      toolbarClassName="custom-toolbar"
    />
  );
}

export default RichTextEditor;

// Add styles for fixed height and scrollable editor
const style = document.createElement('style');
style.innerHTML = `
  .custom-editor {
    min-height: 160px;
    max-height: 240px;
    height: 200px;
    overflow-y: auto;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 12px;
    background: #fff;
  }
  .custom-toolbar {
    border-radius: 6px 6px 0 0;
  }
`;
document.head.appendChild(style);

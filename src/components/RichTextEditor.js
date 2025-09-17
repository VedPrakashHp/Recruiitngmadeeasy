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
      editorClassName="demo-editor"
    />
  );
}

export default RichTextEditor;

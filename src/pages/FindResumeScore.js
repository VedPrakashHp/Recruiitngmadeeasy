import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RichTextEditor from '../components/RichTextEditor';
import { EditorState, convertToRaw } from 'draft-js';

function FindResumeScore() {
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const jobDescription = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    const formData = new FormData();
    formData.append('jobDescription', jobDescription);
    formData.append('resume', resumeFile);
    try {
      const response = await fetch('/api/resume-score', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Failed to fetch score.' });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>Find Resume Score</h2>
      <div style={{ marginBottom: 20 }}>
        <RichTextEditor editorState={editorState} setEditorState={setEditorState} />
      </div>
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
      <br /><br />
      <button onClick={handleSubmit} disabled={loading || !resumeFile}>Submit</button>\

      {loading && <p>Loading...</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}

export default FindResumeScore;

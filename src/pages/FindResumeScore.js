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

  // Helper to generate GUID
  function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  const handleSubmit = async () => {
    setLoading(true);
    // Extract plain text from editor
    const jobDescription = editorState.getCurrentContent().getPlainText();
    // Read file as base64
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
    try {
      let resumeBase64 = await toBase64(resumeFile);
      // Remove data URL prefix if present
      if (resumeBase64.includes(',')) {
        resumeBase64 = resumeBase64.split(',')[1];
      }
      const payload = {
        guid: generateGUID(),
        jobDescription: jobDescription,
        resume: resumeBase64,
      };

      console.log('Payload to be sent:', payload);
      const response = await fetch('https://3d8da3c2aff4e2849e81397f7a38eed.5.environment.api.preprod.powerplatform.com:443/powerautomate/automations/direct/workflows/4b6dd350f7aa4056848ec403719ce3ac/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9pr_Nqhu73-Rp9UPwN9M7d5hGTxTc07gMzzAYfcmkYo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error submitting data:', err);
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
      <button onClick={handleSubmit}>Submit</button>
      {/* <button onClick={handleSubmit} disabled={loading || !resumeFile}>Submit</button> */}

      {loading && <p>Loading...</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}

export default FindResumeScore;

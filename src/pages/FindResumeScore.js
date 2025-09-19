import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RichTextEditor from '../components/RichTextEditor';
import { EditorState } from 'draft-js';
import { Box, Paper, Typography, Button, Stack, LinearProgress, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ScoreIcon from '@mui/icons-material/Score';

function FindResumeScore() {
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [savedResults, setSavedResults] = useState([]);
  // Helper to get a hash for job description (for grouping)
  function getJobDescKey(desc) {
    return btoa(unescape(encodeURIComponent(desc))).slice(0, 32);
  }

  // Load saved results for this job description
  useEffect(() => {
    const jobDescription = editorState.getCurrentContent().getPlainText();
    const key = getJobDescKey(jobDescription);
    const all = JSON.parse(localStorage.getItem('resumeScores') || '{}');
    setSavedResults(all[key] || []);
    // eslint-disable-next-line
  }, [editorState]);

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
      // Save result in localStorage
      const candidateName = resumeFile?.name || 'Unknown';
      const key = getJobDescKey(jobDescription);
      const all = JSON.parse(localStorage.getItem('resumeScores') || '{}');
      if (!all[key]) all[key] = [];
      all[key].push({
        candidate: candidateName,
        date: new Date().toLocaleString(),
        response: data
      });
      localStorage.setItem('resumeScores', JSON.stringify(all));
      setSavedResults(all[key]);
    } catch (err) {
      console.error('Error submitting data:', err);
      setResult({ error: 'Failed to fetch score.' });
    }
    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={4} sx={{ p: 5, borderRadius: 4, minWidth: 350, maxWidth: 500, width: '100%' }}>
        <Stack spacing={3}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} variant="outlined" color="primary" sx={{ alignSelf: 'flex-start' }}>
            Back
          </Button>
          <Typography variant="h5" fontWeight={700} color="primary.main" align="center">
            Find Resume Score
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            Paste or write the job description, upload a resume, and get a match score instantly.
          </Typography>
          <Box>
            <RichTextEditor editorState={editorState} setEditorState={setEditorState} />
          </Box>
          <Button
            variant="contained"
            component="label"
            startIcon={<UploadFileIcon />}
            color="secondary"
            sx={{ mt: 2, mb: 1 }}
          >
            {resumeFile ? resumeFile.name : 'Upload Resume'}
            <input type="file" accept=".pdf,.doc,.docx" hidden onChange={handleFileChange} />
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ScoreIcon />}
            sx={{ fontWeight: 600 }}
            onClick={handleSubmit}
            disabled={loading || !resumeFile}
          >
            Submit
          </Button>
          {loading && <LinearProgress sx={{ my: 2 }} />}
          {result && (
            <Alert severity={result.error ? 'error' : 'success'} sx={{ mt: 2 }}>
              <pre style={{ margin: 0, fontFamily: 'inherit' }}>{JSON.stringify(result, null, 2)}</pre>
            </Alert>
          )}
          {/* Saved Results Section */}
          {savedResults.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Previous Results for this Job Description
              </Typography>
              <Stack spacing={2}>
                {savedResults.map((item, idx) => (
                  <Paper key={idx} sx={{ p: 2, bgcolor: '#f9fafb' }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Candidate: <b>{item.candidate}</b> | {item.date}
                    </Typography>
                    <pre style={{ margin: 0, fontFamily: 'inherit', fontSize: 14 }}>{JSON.stringify(item.response, null, 2)}</pre>
                  </Paper>
                ))}
              </Stack>
            </Box>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}

export default FindResumeScore;

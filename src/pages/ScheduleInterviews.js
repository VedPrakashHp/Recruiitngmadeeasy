import React, { useState } from 'react';
import { Box, Paper, Typography, Button, Stack, TextField, Alert, LinearProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useNavigate } from 'react-router-dom';

function ScheduleInterviews() {
  const navigate = useNavigate();
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [interviewer, setInterviewer] = useState('');
  const [candidate, setCandidate] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSchedule = async () => {
    setLoading(true);
    setResult(null);
    try {
      const payload = {
        "Interviewer": interviewer,
        "candidate": candidate,
        "StartTime": start,
        "EndTime": end,
      };
      // Replace with your actual endpoint
      const response = await fetch('https://3d8da3c2aff4e2849e81397f7a38eed.5.environment.api.preprod.powerplatform.com:443/powerautomate/automations/direct/workflows/583f5cefb1024d699f203aadd162abd6/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5l7jsiBaADiYSO9CQ-CTRXacZpatns2CQ15gCqC_Zdk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      let data = null;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        data = await response.json();
      }
      if (response.ok && (!data || !data.error)) {
        setResult({ success: true });
      } else {
        setResult({ error: (data && data.error) || `Status: ${response.status}` });
      }
    } catch (err) {
      setResult({ error: err.message || 'Failed to schedule interview.' });
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
            Schedule Interview
          </Typography>
          <TextField label="Candidate Email" value={candidate} onChange={e => setCandidate(e.target.value)} fullWidth />
          <TextField label="Interviewer Email" value={interviewer} onChange={e => setInterviewer(e.target.value)} fullWidth />
          <TextField
            label="Start Time"
            type="datetime-local"
            value={start}
            onChange={e => setStart(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="End Time"
            type="datetime-local"
            value={end}
            onChange={e => setEnd(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <Button
            variant="contained"
            color="success"
            size="large"
            startIcon={<EventAvailableIcon />}
            sx={{ fontWeight: 600 }}
            onClick={handleSchedule}
            disabled={loading || !interviewer || !candidate || !start || !end}
          >
            Schedule Interview
          </Button>
          {loading && <LinearProgress sx={{ my: 2 }} />}
          {result && (
            <Alert severity={result.error ? 'error' : 'success'} sx={{ mt: 2 }}>
              {result.error
                ? 'Invite not sent: ' + result.error
                : 'Invite sent successfully!'}
            </Alert>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}

export default ScheduleInterviews;

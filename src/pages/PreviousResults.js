import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Stack, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function PreviousResults() {
  const [allResults, setAllResults] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('resumeScores') || '{}');
    setAllResults(all);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={4} sx={{ p: 5, borderRadius: 4, minWidth: 350, maxWidth: 700, width: '100%' }}>
        <Stack spacing={3}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} variant="outlined" color="primary" sx={{ alignSelf: 'flex-start' }}>
            Back
          </Button>
          <Typography variant="h5" fontWeight={700} color="primary.main" align="center">
            All Previous Results
          </Typography>
          {Object.keys(allResults).length === 0 && (
            <Typography color="text.secondary" align="center">No results found.</Typography>
          )}
          {Object.entries(allResults).map(([jobKey, results], idx) => (
            <Box key={jobKey} sx={{ mb: 3 }}>
              <Typography variant="subtitle1" color="secondary" sx={{ mb: 1 }}>
                Job Description #{idx + 1}
              </Typography>
              <Paper sx={{ p: 2, mb: 2, bgcolor: '#f9fafb' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {decodeURIComponent(escape(atob(jobKey)))}
                </Typography>
                <Stack spacing={2}>
                  {results.map((item, i) => (
                    <Paper key={i} sx={{ p: 2, bgcolor: '#fff' }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Candidate: <b>{item.candidate}</b> | {item.date}
                      </Typography>
                      <pre style={{ margin: 0, fontFamily: 'inherit', fontSize: 14 }}>{JSON.stringify(item.response, null, 2)}</pre>
                    </Paper>
                  ))}
                </Stack>
              </Paper>
            </Box>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}

export default PreviousResults;

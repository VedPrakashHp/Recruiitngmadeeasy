import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Button, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GroupsIcon from '@mui/icons-material/Groups';

function FindInterviewers() {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={4} sx={{ p: 5, borderRadius: 4, minWidth: 350, maxWidth: 500, width: '100%' }}>
        <Stack spacing={3}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} variant="outlined" color="primary" sx={{ alignSelf: 'flex-start' }}>
            Back
          </Button>
          <Typography variant="h5" fontWeight={700} color="primary.main" align="center">
            Find Interviewers
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            Coming soon: Find the best interviewers for your job openings.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<GroupsIcon />}
            sx={{ fontWeight: 600 }}
            disabled
          >
            Find Interviewers
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default FindInterviewers;

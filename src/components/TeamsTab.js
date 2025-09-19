import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as microsoftTeams from "@microsoft/teams-js";
import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';
import GroupsIcon from '@mui/icons-material/Groups';
import ScoreIcon from '@mui/icons-material/Score';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const TeamsTab = () => {
  const [inTeams, setInTeams] = useState(false);
  const [context, setContext] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function initTeams() {
      try {
        await microsoftTeams.app.initialize();
        const ctx = await microsoftTeams.app.getContext();
        setInTeams(true);
        setContext(ctx);
      } catch (err) {
        console.log("Not running inside Teams or init failed", err);
      }
    }
    initTeams();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={4} sx={{ p: 5, borderRadius: 4, minWidth: 350, maxWidth: 400, width: '100%' }}>
        <Stack spacing={3} alignItems="center">
          <Typography variant="h4" fontWeight={700} color="primary.main" gutterBottom>
            Teams Recruiting Agent
          </Typography>
          {/* <Typography variant="subtitle1" color="text.secondary">
            {inTeams
              ? <>Running inside Teams <span role="img" aria-label="check">✅</span> (User: {context?.user?.userPrincipalName})</>
              : <>Running in browser (dev mode)</>}
          </Typography> */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ScoreIcon />}
            fullWidth
            sx={{ textTransform: 'none', fontWeight: 600 }}
            onClick={() => navigate('/find-resume-score')}
          >
            Find Resume Score
          </Button>
          <Button
            variant="outlined"
            color="info"
            size="large"
            startIcon={<HistoryIcon />}
            fullWidth
            sx={{ textTransform: 'none', fontWeight: 600 }}
            onClick={() => navigate('/previous-results')}
          >
            Previous Results
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<GroupsIcon />}
            fullWidth
            sx={{ textTransform: 'none', fontWeight: 600 }}
            onClick={() => navigate('/find-interviewers')}
          >
            Find Interviewers
          </Button>
          <Button
            variant="contained"
            color="success"
            size="large"
            startIcon={<EventAvailableIcon />}
            fullWidth
            sx={{ textTransform: 'none', fontWeight: 600 }}
            onClick={() => navigate('/schedule-interviews')}
          >
            Schedule Interviews
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default TeamsTab;

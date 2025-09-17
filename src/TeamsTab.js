import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as microsoftTeams from "@microsoft/teams-js";

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
      <div style={{ padding: 20 }}>
        <h2>Teams Recruiting Agent</h2>
        {inTeams ? (
          <p>Running inside Teams ✅ (User: {context?.user?.userPrincipalName})</p>
        ) : (
          <p>Running in browser (dev mode)</p>
        )}

        <button style={{ margin: 10 }} onClick={() => navigate('/find-resume-score')}>Find Resume Score</button>
        <button style={{ margin: 10 }} onClick={() => navigate('/find-interviewers')}>Find Interviewers</button>
        <button style={{ margin: 10 }} onClick={() => navigate('/schedule-interviews')}>Schedule Interviews</button>
      </div>
    );
  }

  export default TeamsTab;
import React, { useEffect, useState } from "react";
import * as microsoftTeams from "@microsoft/teams-js";

export default function TeamsTab() {
  const [inTeams, setInTeams] = useState(false);
  const [context, setContext] = useState(null);

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

      {/* File upload input */}
      <input
        type="file"
        onChange={(e) => alert(`Selected: ${e.target.files[0].name}`)}
        style={{ marginTop: 10 }}
      />
    </div>
  );
}
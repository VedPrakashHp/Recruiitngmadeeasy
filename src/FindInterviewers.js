import React from 'react';
import { useNavigate } from 'react-router-dom';

function FindInterviewers() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>Find Interviewers</h2>
      {/* Add your logic here */}
    </div>
  );
}

export default FindInterviewers;

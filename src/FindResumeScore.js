import React from 'react';
import { useNavigate } from 'react-router-dom';

function FindResumeScore() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>Find Resume Score</h2>
      {/* Add your form or logic here */}
    </div>
  );
}

export default FindResumeScore;

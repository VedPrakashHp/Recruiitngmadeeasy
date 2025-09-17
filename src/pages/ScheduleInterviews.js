import React from 'react';
import { useNavigate } from 'react-router-dom';

function ScheduleInterviews() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>Schedule Interviews</h2>
      {/* Add your logic here */}
    </div>
  );
}

export default ScheduleInterviews;

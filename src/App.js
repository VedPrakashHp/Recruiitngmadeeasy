import TeamsTab from "./components/TeamsTab";
import FindResumeScore from "./pages/FindResumeScore";
import FindInterviewers from "./pages/FindInterviewers";
import ScheduleInterviews from "./pages/ScheduleInterviews";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
  <Route path="/" element={<TeamsTab />} />
  <Route path="/find-resume-score" element={<FindResumeScore />} />
  <Route path="/find-interviewers" element={<FindInterviewers />} />
  <Route path="/schedule-interviews" element={<ScheduleInterviews />} />
    </Routes>
  );
}

export default App;

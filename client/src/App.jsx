import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import UploadPage from "./pages/Upload/Upload.jsx";
import Report from "./pages/Analytics/Analytics.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/upload" element={<UploadPage />} />

      {/* Selected report */}
      <Route path="/analytics" element={<Report />} />
      <Route path="/analytics/:reportId" element={<Report />} />
    </Routes>
  );
};

export default App;
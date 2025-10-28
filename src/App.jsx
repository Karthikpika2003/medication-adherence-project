// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorDashboard from "./pages/doctordashboard";
import PatientDashboard from "./pages/patientdashboard";
import Records from "./pages/Records";
import Settings from "./pages/Settings";
import Home from "./pages/home";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home page with login/signup modals */}
        <Route path="/" element={<Home />} />

        {/* Dashboard routes */}
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/patient" element={<PatientDashboard />} />
        


        {/* Other pages */}
        <Route path="/records" element={<Records />} />
        <Route path="/settings" element={<Settings />} />

        {/* Fallback: redirect unknown paths to home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

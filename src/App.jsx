import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DoctorDashboard from "./pages/doctordashboard";
import PatientDashboard from "./pages/patientdashboard";
import Records from "./pages/Records";
import Settings from "./pages/Settings";
import Home from "./pages/home";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home page with login/signup modals */}
        <Route path="/" element={<Home />} />

        {/* Protected Dashboard routes */}
        <Route 
          path="/doctor" 
          element={
            <ProtectedRoute requiredRole="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/patient" 
          element={
            <ProtectedRoute requiredRole="patient">
              <PatientDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Other pages */}
        <Route path="/records" element={<Records />} />
        <Route path="/settings" element={<Settings />} />

        {/* Fallback: redirect unknown paths to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

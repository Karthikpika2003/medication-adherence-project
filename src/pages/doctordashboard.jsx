// src/pages/doctordashboard.jsx
// Updated with API integration

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { doctorAPI } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch patients when component mounts
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await doctorAPI.getPatients();
      setPatients(response.data.patients);
      setError(null);
    } catch (err) {
      setError('Failed to load patients. Please try again.');
      console.error('Error fetching patients:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (patientId) => {
    try {
      setLoading(true);
      const response = await doctorAPI.getPatientById(patientId);
      setSelectedPatient(response.data);
      setActiveSection("patientDetail");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert('Failed to load patient details');
      console.error('Error fetching patient details:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate("/");
  };

  const renderSection = () => {
    // Show loading spinner
    if (loading && activeSection === "home") {
      return <LoadingSpinner message="Loading patients..." />;
    }

    // Show error message
    if (error && activeSection === "home") {
      return <ErrorMessage message={error} onRetry={fetchPatients} />;
    }

    switch(activeSection) {
      case "home":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ padding: "20px" }}
          >
            <h2 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "600" }}>
              Patient Management
            </h2>
            <p style={{ color: "#666", marginBottom: "30px" }}>
              Manage patients, view AI insights, track appointments, and update your settings.
            </p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ 
                width: "100%", 
                borderCollapse: "collapse",
                backgroundColor: "white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                borderRadius: "8px",
                overflow: "hidden"
              }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8f9fa" }}>
                    <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #dee2e6" }}>ID</th>
                    <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #dee2e6" }}>Name</th>
                    <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #dee2e6" }}>Age</th>
                    <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #dee2e6" }}>Condition</th>
                    <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #dee2e6" }}>Adherence</th>
                    <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #dee2e6" }}>Risk Level</th>
                    <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #dee2e6" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ padding: "20px", textAlign: "center", color: "#666" }}>
                        No patients found
                      </td>
                    </tr>
                  ) : (
                    patients.map((p) => (
                      <tr key={p.id} style={{ borderBottom: "1px solid #dee2e6" }}>
                        <td style={{ padding: "12px" }}>{p.id}</td>
                        <td style={{ padding: "12px", fontWeight: "500" }}>{p.name}</td>
                        <td style={{ padding: "12px" }}>{p.age}</td>
                        <td style={{ padding: "12px" }}>{p.condition}</td>
                        <td style={{ padding: "12px" }}>
                          {p.adherenceRate ? (
                            <span style={{
                              backgroundColor: p.adherenceRate >= 0.8 ? '#d4edda' : p.adherenceRate >= 0.6 ? '#fff3cd' : '#f8d7da',
                              color: p.adherenceRate >= 0.8 ? '#155724' : p.adherenceRate >= 0.6 ? '#856404' : '#721c24',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '14px'
                            }}>
                              {(p.adherenceRate * 100).toFixed(0)}%
                            </span>
                          ) : 'N/A'}
                        </td>
                        <td style={{ padding: "12px" }}>
                          {p.riskLevel ? (
                            <span style={{
                              color: p.riskLevel === 'high' ? '#dc3545' : 
                                     p.riskLevel === 'medium' ? '#fd7e14' : '#28a745',
                              fontWeight: 'bold',
                              textTransform: 'uppercase',
                              fontSize: '13px'
                            }}>
                              {p.riskLevel}
                            </span>
                          ) : 'N/A'}
                        </td>
                        <td style={{ padding: "12px" }}>
                          <button 
                            onClick={() => handleViewDetails(p.id)}
                            style={{
                              padding: "6px 12px",
                              backgroundColor: "#007bff",
                              color: "white",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                              fontSize: "14px"
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
                            onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        );

      case "patientDetail":
        if (loading) {
          return <LoadingSpinner message="Loading patient details..." />;
        }

        if (!selectedPatient) {
          return <div style={{ padding: "20px" }}>No patient selected</div>;
        }

        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ padding: "20px" }}
          >
            <button 
              onClick={() => {
                setActiveSection("home");
                setSelectedPatient(null);
              }}
              style={{
                padding: "8px 16px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginBottom: "20px",
                fontSize: "14px"
              }}
            >
              ← Back to Patients
            </button>

            <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>{selectedPatient.name}</h2>
            <div style={{ color: "#666", marginBottom: "30px" }}>
              <p>Age: {selectedPatient.age}</p>
              <p>Condition: {selectedPatient.condition}</p>
              <p>Last Visit: {selectedPatient.lastVisit}</p>
              {selectedPatient.notes && <p>Notes: {selectedPatient.notes}</p>}
            </div>

            {/* Medications Section */}
            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ fontSize: "20px", marginBottom: "15px" }}>Medications</h3>
              {selectedPatient.medications && selectedPatient.medications.length > 0 ? (
                <div style={{ display: "grid", gap: "15px" }}>
                  {selectedPatient.medications.map((med, idx) => (
                    <div key={idx} style={{
                      backgroundColor: "white",
                      padding: "15px",
                      borderRadius: "8px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      borderLeft: "4px solid #007bff"
                    }}>
                      <h4 style={{ margin: "0 0 8px 0", fontSize: "16px" }}>{med.name}</h4>
                      <p style={{ margin: "4px 0", color: "#666" }}>Dosage: {med.dosage}</p>
                      <p style={{ margin: "4px 0", color: "#666" }}>Frequency: {med.frequency}</p>
                      {med.adherenceRate !== undefined && (
                        <p style={{ margin: "8px 0 0 0" }}>
                          Adherence: <strong style={{
                            color: med.adherenceRate >= 0.8 ? '#28a745' : med.adherenceRate >= 0.6 ? '#fd7e14' : '#dc3545'
                          }}>
                            {(med.adherenceRate * 100).toFixed(0)}%
                          </strong>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#666" }}>No medications listed</p>
              )}
            </div>

            {/* AI Prediction Section */}
            {selectedPatient.aiPrediction && (
              <div style={{
                backgroundColor: "#f8f9fa",
                padding: "20px",
                borderRadius: "8px",
                marginBottom: "20px"
              }}>
                <h3 style={{ fontSize: "20px", marginBottom: "15px" }}>🤖 AI Adherence Prediction</h3>
                
                <div style={{ display: "grid", gap: "15px" }}>
                  <div>
                    <p style={{ margin: "0 0 5px 0", color: "#666" }}>Prediction:</p>
                    <p style={{ 
                      margin: 0, 
                      fontSize: "18px", 
                      fontWeight: "bold",
                      color: selectedPatient.aiPrediction.prediction === 'non-adherent' ? '#dc3545' : '#28a745'
                    }}>
                      {selectedPatient.aiPrediction.prediction === 'non-adherent' ? 'Non-Adherent' : 'Adherent'}
                    </p>
                  </div>

                  <div>
                    <p style={{ margin: "0 0 5px 0", color: "#666" }}>Risk Score:</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{
                        flex: 1,
                        height: "24px",
                        backgroundColor: "#e9ecef",
                        borderRadius: "12px",
                        overflow: "hidden"
                      }}>
                        <div style={{
                          width: `${(selectedPatient.aiPrediction.riskScore * 100)}%`,
                          height: "100%",
                          backgroundColor: selectedPatient.aiPrediction.riskScore > 0.7 ? '#dc3545' : 
                                          selectedPatient.aiPrediction.riskScore > 0.4 ? '#fd7e14' : '#28a745',
                          transition: "width 0.3s ease"
                        }} />
                      </div>
                      <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                        {(selectedPatient.aiPrediction.riskScore * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <p style={{ margin: "0 0 5px 0", color: "#666" }}>Risk Level:</p>
                    <span style={{
                      display: "inline-block",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontWeight: "bold",
                      backgroundColor: selectedPatient.aiPrediction.riskLevel === 'high' ? '#f8d7da' : 
                                      selectedPatient.aiPrediction.riskLevel === 'medium' ? '#fff3cd' : '#d4edda',
                      color: selectedPatient.aiPrediction.riskLevel === 'high' ? '#721c24' : 
                             selectedPatient.aiPrediction.riskLevel === 'medium' ? '#856404' : '#155724'
                    }}>
                      {selectedPatient.aiPrediction.riskLevel.toUpperCase()}
                    </span>
                  </div>

                  {selectedPatient.aiPrediction.confidence && (
                    <div>
                      <p style={{ margin: "0 0 5px 0", color: "#666" }}>Confidence:</p>
                      <p style={{ margin: 0, fontWeight: "bold" }}>
                        {(selectedPatient.aiPrediction.confidence * 100).toFixed(0)}%
                      </p>
                    </div>
                  )}
                </div>

                {/* Risk Factors */}
                {selectedPatient.aiPrediction.riskFactors && selectedPatient.aiPrediction.riskFactors.length > 0 && (
                  <div style={{ marginTop: "20px" }}>
                    <h4 style={{ fontSize: "16px", marginBottom: "10px" }}>⚠️ Risk Factors:</h4>
                    <ul style={{ margin: 0, paddingLeft: "20px" }}>
                      {selectedPatient.aiPrediction.riskFactors.map((factor, idx) => (
                        <li key={idx} style={{ marginBottom: "5px", color: "#721c24" }}>{factor}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                {selectedPatient.aiPrediction.recommendations && selectedPatient.aiPrediction.recommendations.length > 0 && (
                  <div style={{ marginTop: "20px" }}>
                    <h4 style={{ fontSize: "16px", marginBottom: "10px" }}>💡 Recommendations:</h4>
                    <ul style={{ margin: 0, paddingLeft: "20px" }}>
                      {selectedPatient.aiPrediction.recommendations.map((rec, idx) => (
                        <li key={idx} style={{ marginBottom: "5px", color: "#155724" }}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Adherence History Chart Placeholder */}
            {selectedPatient.adherenceHistory && selectedPatient.adherenceHistory.length > 0 && (
              <div style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
              }}>
                <h3 style={{ fontSize: "20px", marginBottom: "15px" }}>📊 Adherence History</h3>
                <p style={{ color: "#666" }}>Chart visualization coming soon...</p>
                <div style={{ fontSize: "14px", color: "#666" }}>
                  {selectedPatient.adherenceHistory.map((item, idx) => (
                    <div key={idx} style={{ marginBottom: "5px" }}>
                      {item.date}: {(item.rate * 100).toFixed(0)}%
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        );

      case "appointments":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ padding: "20px" }}
          >
            <h2>Appointments</h2>
            <p style={{ color: "#666" }}>Placeholder for appointment schedule and management.</p>
          </motion.div>
        );

      case "ai":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ padding: "20px" }}
          >
            <h2>AI Analytics</h2>
            <p style={{ color: "#666" }}>Your AI analysis on patient adherence and health trends will appear here.</p>
          </motion.div>
        );

      case "settings":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ padding: "20px" }}
          >
            <h2>Settings</h2>
            <p style={{ color: "#666" }}>Update profile, password, preferences, and notification settings here.</p>
          </motion.div>
        );

      default:
        return (
          <div style={{ padding: "20px" }}>
            <p>Default home content.</p>
          </div>
        );
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Sidebar */}
      <div style={{
        width: "250px",
        backgroundColor: "white",
        boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{ padding: "20px", borderBottom: "1px solid #e9ecef" }}>
          <h1 style={{ margin: 0, fontSize: "20px", color: "#007bff" }}>MediTrack AI</h1>
          <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#666" }}>Doctor Dashboard</p>
        </div>

        <nav style={{ flex: 1, padding: "20px 0" }}>
          {[
            { id: "home", label: "Patients", icon: "👥" },
            { id: "appointments", label: "Appointments", icon: "📅" },
            { id: "ai", label: "AI Analytics", icon: "🤖" },
            { id: "settings", label: "Settings", icon: "⚙️" }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              style={{
                width: "100%",
                padding: "12px 20px",
                textAlign: "left",
                backgroundColor: activeSection === item.id ? "#e7f3ff" : "transparent",
                color: activeSection === item.id ? "#007bff" : "#666",
                border: "none",
                borderLeft: activeSection === item.id ? "4px solid #007bff" : "4px solid transparent",
                cursor: "pointer",
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "20px", borderTop: "1px solid #e9ecef" }}>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <AnimatePresence mode="wait">
          {renderSection()}
        </AnimatePresence>
      </div>
    </div>
  );
}
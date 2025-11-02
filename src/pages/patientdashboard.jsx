// src/pages/patientdashboard.jsx
// Updated with API integration

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaPills, FaRobot, FaCog, FaSignOutAlt } from "react-icons/fa";
import { patientAPI } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("Home");
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      const response = await patientAPI.getMyData();
      setPatient(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load your data. Please try again.');
      console.error('Error fetching patient data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsTaken = async (reminderId, medicationId) => {
    try {
      await patientAPI.markMedicationTaken({
        reminderId,
        medicationId,
        takenAt: new Date().toISOString()
      });
      
      // Refresh patient data to show updated status
      fetchPatientData();
      
      alert('Medication marked as taken! ✓');
    } catch (err) {
      alert('Failed to mark medication as taken. Please try again.');
      console.error('Error marking medication:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate("/");
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner message="Loading your data..." />;
    }

    if (error) {
      return <ErrorMessage message={error} onRetry={fetchPatientData} />;
    }

    if (!patient) {
      return (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <p style={{ color: "#666", fontSize: "16px" }}>No patient data available</p>
        </div>
      );
    }

    switch (selectedMenu) {
      case "Home":
        return (
          <div style={{ padding: "30px" }}>
            <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>
              Welcome, {patient.name}! 👋
            </h2>
            <p style={{ color: "#666", fontSize: "16px", marginBottom: "30px" }}>
              Your last visit was on {patient.lastVisit}.
            </p>

            {/* Adherence Stats Card */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginBottom: "30px"
            }}>
              <div style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                borderLeft: "4px solid #28a745"
              }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#666", textTransform: "uppercase" }}>
                  Adherence Rate
                </h3>
                <p style={{ margin: 0, fontSize: "32px", fontWeight: "bold", color: "#28a745" }}>
                  {patient.adherenceRate ? (patient.adherenceRate * 100).toFixed(0) : '0'}%
                </p>
              </div>

              <div style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                borderLeft: "4px solid #007bff"
              }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#666", textTransform: "uppercase" }}>
                  Upcoming Reminders
                </h3>
                <p style={{ margin: 0, fontSize: "32px", fontWeight: "bold", color: "#007bff" }}>
                  {patient.upcomingReminders || 0}
                </p>
              </div>

              <div style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                borderLeft: "4px solid #fd7e14"
              }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#666", textTransform: "uppercase" }}>
                  Total Medications
                </h3>
                <p style={{ margin: 0, fontSize: "32px", fontWeight: "bold", color: "#fd7e14" }}>
                  {patient.totalMedications || patient.medications?.length || 0}
                </p>
              </div>
            </div>

            {/* AI Insights */}
            {patient.aiInsights && (
              <div style={{
                backgroundColor: "#e7f3ff",
                padding: "20px",
                borderRadius: "10px",
                marginBottom: "30px",
                borderLeft: "4px solid #007bff"
              }}>
                <h3 style={{ margin: "0 0 15px 0", fontSize: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
                  🤖 AI Health Insights
                </h3>
                <p style={{ margin: "0 0 10px 0", fontSize: "16px", color: "#333" }}>
                  {patient.aiInsights.message}
                </p>
                <div style={{ display: "flex", gap: "20px", fontSize: "14px", color: "#666" }}>
                  <span>
                    <strong>Trend:</strong> {patient.aiInsights.adherenceTrend}
                  </span>
                  <span>
                    <strong>Missed this week:</strong> {patient.aiInsights.missedDosesThisWeek}
                  </span>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div>
              <h3 style={{ fontSize: "20px", marginBottom: "15px" }}>Quick Actions</h3>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  onClick={() => setSelectedMenu("Medications")}
                  style={{
                    padding: "12px 20px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500"
                  }}
                >
                  View Medications
                </button>
                <button
                  onClick={() => setSelectedMenu("AI Insights")}
                  style={{
                    padding: "12px 20px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500"
                  }}
                >
                  AI Analysis
                </button>
              </div>
            </div>
          </div>
        );

      case "Medications":
        return (
          <div style={{ padding: "30px" }}>
            <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>💊 Your Medications</h2>

            {!patient.medications || patient.medications.length === 0 ? (
              <div style={{
                backgroundColor: "white",
                padding: "40px",
                borderRadius: "10px",
                textAlign: "center",
                color: "#666"
              }}>
                <p style={{ fontSize: "16px" }}>No medications found</p>
              </div>
            ) : (
              <div style={{ display: "grid", gap: "15px" }}>
                {patient.medications.map((med) => {
                  const getStatusColor = (status) => {
                    switch(status) {
                      case 'Taken': return { bg: '#d4edda', border: '#28a745', text: '#155724' };
                      case 'Pending': return { bg: '#fff3cd', border: '#ffc107', text: '#856404' };
                      case 'Missed': return { bg: '#f8d7da', border: '#dc3545', text: '#721c24' };
                      case 'Upcoming': return { bg: '#d1ecf1', border: '#17a2b8', text: '#0c5460' };
                      default: return { bg: '#e9ecef', border: '#6c757d', text: '#495057' };
                    }
                  };

                  const colors = getStatusColor(med.status);

                  return (
                    <div
                      key={med.id}
                      style={{
                        backgroundColor: colors.bg,
                        padding: "20px",
                        borderRadius: "10px",
                        borderLeft: `4px solid ${colors.border}`,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "10px" }}>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ margin: "0 0 8px 0", fontSize: "20px", color: colors.text }}>
                            {med.name}
                          </h3>
                          <p style={{ margin: "0 0 4px 0", color: colors.text, fontSize: "14px" }}>
                            <strong>Dosage:</strong> {med.dosage}
                          </p>
                          <p style={{ margin: "0 0 4px 0", color: colors.text, fontSize: "14px" }}>
                            <strong>Time:</strong> {med.time}
                          </p>
                        </div>
                        <div>
                          <span style={{
                            display: "inline-block",
                            padding: "6px 12px",
                            backgroundColor: colors.border,
                            color: "white",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            textTransform: "uppercase"
                          }}>
                            {med.status}
                          </span>
                        </div>
                      </div>

                      {med.status === 'Taken' && med.takenAt && (
                        <p style={{ margin: "10px 0 0 0", fontSize: "13px", color: colors.text }}>
                          ✓ Taken at: {new Date(med.takenAt).toLocaleTimeString()}
                        </p>
                      )}

                      {med.status === 'Pending' && (
                        <button
                          onClick={() => handleMarkAsTaken(med.reminderId, med.id)}
                          style={{
                            marginTop: "10px",
                            padding: "8px 16px",
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "500"
                          }}
                        >
                          ✓ Mark as Taken
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );

      case "AI Insights":
        return (
          <div style={{ padding: "30px" }}>
            <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>🤖 AI Health Analysis</h2>
            
            {patient.aiInsights ? (
              <div>
                <div style={{
                  backgroundColor: "white",
                  padding: "25px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  marginBottom: "20px"
                }}>
                  <h3 style={{ margin: "0 0 15px 0", fontSize: "20px" }}>Current Status</h3>
                  <p style={{ fontSize: "16px", marginBottom: "15px", color: "#333" }}>
                    {patient.aiInsights.message}
                  </p>
                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                    gap: "15px",
                    marginTop: "20px"
                  }}>
                    <div style={{ 
                      padding: "15px", 
                      backgroundColor: "#f8f9fa", 
                      borderRadius: "8px",
                      textAlign: "center"
                    }}>
                      <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#666" }}>Adherence Trend</p>
                      <p style={{ 
                        margin: 0, 
                        fontSize: "24px", 
                        fontWeight: "bold",
                        color: patient.aiInsights.adherenceTrend === 'improving' ? '#28a745' : 
                               patient.aiInsights.adherenceTrend === 'stable' ? '#007bff' : '#dc3545'
                      }}>
                        {patient.aiInsights.adherenceTrend}
                      </p>
                    </div>
                    <div style={{ 
                      padding: "15px", 
                      backgroundColor: "#f8f9fa", 
                      borderRadius: "8px",
                      textAlign: "center"
                    }}>
                      <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#666" }}>Missed This Week</p>
                      <p style={{ margin: 0, fontSize: "24px", fontWeight: "bold", color: "#dc3545" }}>
                        {patient.aiInsights.missedDosesThisWeek}
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{
                  backgroundColor: "#fff3cd",
                  padding: "20px",
                  borderRadius: "10px",
                  borderLeft: "4px solid #ffc107"
                }}>
                  <h4 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>💡 Recommendations</h4>
                  <ul style={{ margin: 0, paddingLeft: "20px" }}>
                    <li style={{ marginBottom: "8px" }}>Set up medication reminders on your phone</li>
                    <li style={{ marginBottom: "8px" }}>Take medications at the same time each day</li>
                    <li style={{ marginBottom: "8px" }}>Use a pill organizer for better tracking</li>
                    <li style={{ marginBottom: "8px" }}>Contact your doctor if you're experiencing side effects</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div style={{
                backgroundColor: "white",
                padding: "40px",
                borderRadius: "10px",
                textAlign: "center",
                color: "#666"
              }}>
                <p style={{ fontSize: "16px" }}>
                  AI insights will appear here once you have more adherence data.
                </p>
              </div>
            )}
          </div>
        );

      case "Settings":
        return (
          <div style={{ padding: "30px" }}>
            <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>⚙️ Settings</h2>
            <div style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}>
              <p style={{ color: "#666", fontSize: "16px" }}>
                Settings and preferences will be available here soon.
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div style={{ padding: "30px" }}>
            <p style={{ color: "#666" }}>Feature coming soon...</p>
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
          <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#666" }}>Patient Portal</p>
        </div>

        <nav style={{ flex: 1, padding: "20px 0" }}>
          {[
            { id: "Home", label: "Home", icon: <FaHome /> },
            { id: "Medications", label: "Medications", icon: <FaPills /> },
            { id: "AI Insights", label: "AI Insights", icon: <FaRobot /> },
            { id: "Settings", label: "Settings", icon: <FaCog /> }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setSelectedMenu(item.id)}
              style={{
                width: "100%",
                padding: "12px 20px",
                textAlign: "left",
                backgroundColor: selectedMenu === item.id ? "#e7f3ff" : "transparent",
                color: selectedMenu === item.id ? "#007bff" : "#666",
                border: "none",
                borderLeft: selectedMenu === item.id ? "4px solid #007bff" : "4px solid transparent",
                cursor: "pointer",
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}
            >
              {item.icon}
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
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {renderContent()}
      </div>
    </div>
  );
}
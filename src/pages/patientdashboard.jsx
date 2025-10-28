import React, { useState, useEffect } from "react";
import patientsData from "../data/patients.json";
import { useNavigate } from "react-router-dom";
import { FaHome, FaPills, FaRobot, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("Home");
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    // Mock: Fetch first patient (in real case, fetch from backend or context)
    setPatient(patientsData[0]);
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "Home":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">
              Welcome, {patient?.name}
            </h2>
            <p className="text-gray-600">
              Your last visit was on {patient?.lastVisit}.
            </p>
          </div>
        );
      case "Medications":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-3">My Medications</h2>
            <ul className="list-disc pl-6">
              {patient?.medications.map((med, index) => (
                <li key={index} className="text-gray-700">
                  {med}
                </li>
              ))}
            </ul>
          </div>
        );
      case "AI Insights":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">AI Health Insights</h2>
            <p className="text-gray-600">
              Here you’ll see AI-driven health insights and recommendations soon.
            </p>
          </div>
        );
      case "Settings":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Account Settings</h2>
            <p className="text-gray-600">Feature coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white flex flex-col">
        <h1 className="text-2xl font-bold text-center py-6 border-b border-blue-700">
          MediTrack - Patient
        </h1>
        <nav className="flex-1 mt-4">
          <button
            onClick={() => setSelectedMenu("Home")}
            className={`flex items-center w-full px-6 py-3 hover:bg-blue-700 ${
              selectedMenu === "Home" && "bg-blue-700"
            }`}
          >
            <FaHome className="mr-3" /> Home
          </button>
          <button
            onClick={() => setSelectedMenu("Medications")}
            className={`flex items-center w-full px-6 py-3 hover:bg-blue-700 ${
              selectedMenu === "Medications" && "bg-blue-700"
            }`}
          >
            <FaPills className="mr-3" /> Medications
          </button>
          <button
            onClick={() => setSelectedMenu("AI Insights")}
            className={`flex items-center w-full px-6 py-3 hover:bg-blue-700 ${
              selectedMenu === "AI Insights" && "bg-blue-700"
            }`}
          >
            <FaRobot className="mr-3" /> AI Insights
          </button>
          <button
            onClick={() => setSelectedMenu("Settings")}
            className={`flex items-center w-full px-6 py-3 hover:bg-blue-700 ${
              selectedMenu === "Settings" && "bg-blue-700"
            }`}
          >
            <FaCog className="mr-3" /> Settings
          </button>
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center px-6 py-4 bg-blue-900 hover:bg-red-600"
        >
          <FaSignOutAlt className="mr-3" /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </div>
  );
}

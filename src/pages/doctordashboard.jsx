// src/pages/DoctorDashboard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import doctorsData from "../data/doctors.json"; // sample JSON for patients/appointments

export default function DoctorDashboard() {
  const navigate = useNavigate(); 
  const [activeSection, setActiveSection] = useState("home");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const renderSection = () => {
    switch(activeSection) {
      case "home":
        return (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-sky-700 mb-4">Welcome, Doctor!</h2>
            <p className="text-gray-700">Manage patients, view AI insights, track appointments, and update your settings.</p>
          </div>
        );
      case "patients":
        return (
          <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
            <h2 className="text-xl font-semibold text-sky-700 mb-4">Patients List</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-sky-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Age</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Condition</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {doctorsData.patients.map((p) => (
                  <tr key={p.id} className="hover:bg-sky-50">
                    <td className="px-6 py-4">{p.id}</td>
                    <td className="px-6 py-4">{p.name}</td>
                    <td className="px-6 py-4">{p.age}</td>
                    <td className="px-6 py-4">{p.condition}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedPatient(p)}
                        className="px-3 py-1 bg-sky-500 text-white rounded hover:bg-sky-600"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "appointments":
        return (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-sky-700 mb-4">Appointments</h2>
            <p className="text-gray-700">Placeholder for appointment schedule and management.</p>
          </div>
        );
      case "ai":
        return (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-sky-700 mb-4">AI Insights</h2>
            <p className="text-gray-700">Your AI analysis on patient adherence and health trends will appear here.</p>
          </div>
        );
      case "settings":
        return (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-sky-700 mb-4">Settings</h2>
            <p className="text-gray-700">Update profile, password, preferences, and notification settings here.</p>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-sky-700 mb-4">Welcome, Doctor!</h2>
            <p className="text-gray-700">Default home content.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-sky-600 text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">MediTrack-AI (Doctor)</h1>
          <nav className="space-x-6 text-sm font-medium">
            <button onClick={() => setActiveSection("home")} className="hover:text-sky-200">Home</button>
            <button onClick={() => setActiveSection("patients")} className="hover:text-sky-200">Patients</button>
            <button onClick={() => setActiveSection("appointments")} className="hover:text-sky-200">Appointments</button>
            <button onClick={() => setActiveSection("ai")} className="hover:text-sky-200">AI Insights</button>
            <button onClick={() => setActiveSection("settings")} className="hover:text-sky-200">Settings</button>
            <button
  onClick={() => {
    localStorage.removeItem("role"); // clear session info if stored
    navigate("/"); // redirect to home
  }}
  className="hover:text-sky-200"
>
  Logout
</button>

          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {renderSection()}
      </main>

      {/* Patient Detail Modal */}
      <AnimatePresence>
        {selectedPatient && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-sky-600">{selectedPatient.name}</h3>
                <button onClick={() => setSelectedPatient(null)} className="text-gray-500 hover:text-gray-700">✕</button>
              </div>
              <p>Age: {selectedPatient.age}</p>
              <p>Condition: {selectedPatient.condition}</p>
              <p>Medications: {selectedPatient.medications.join(", ")}</p>
              <div className="mt-4 flex justify-end">
                <button onClick={() => setSelectedPatient(null)} className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

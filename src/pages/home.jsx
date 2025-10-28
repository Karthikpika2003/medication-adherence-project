// src/pages/Home.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginModal from "../Components/LoginModal";
import SignupModal from "../Components/SignupModal";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showPercent, setShowPercent] = useState(false);
  const [showDeaths, setShowDeaths] = useState(false);
  const [showAI, setShowAI] = useState(false);

  const handleLogin = (role) => {
    localStorage.setItem("role", role); // save role for logout
    if (role === "doctor") navigate("/doctor");
    else navigate("/patient");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-800">
      {/* Header */}
      <header className="bg-sky-600 text-white shadow-md border-b border-sky-400">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wider">MediTrack-AI</h1>
          <nav className="space-x-6 text-sm font-medium">
            <button onClick={() => setShowLogin(true)} className="hover:text-sky-200">Login</button>
            <button onClick={() => setShowSignup(true)} className="hover:text-sky-200">Sign Up</button>
            <a href="#about" className="hover:text-sky-200">About Us</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-grow bg-white flex flex-col items-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-sky-600 mb-6">
            Smarter medication. Better outcomes.
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            MediTrack-AI uses data-driven models to predict medication non-adherence and provide timely interventions.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setShowSignup(true)}
              className="px-6 py-3 border border-sky-600 text-sky-600 rounded-lg hover:bg-sky-50"
            >
              Get Started
            </button>
          </div>
        </motion.div>
      </main>

      {/* Info Cards */}
      <section className="bg-sky-50 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <motion.div className="bg-white p-6 rounded-xl shadow-md border border-sky-100"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <p className="text-5xl font-extrabold text-sky-500">50%</p>
            <p className="mt-2 font-medium text-gray-700">of patients forget to take medications</p>
            <button onClick={() => setShowPercent(!showPercent)} className="text-sky-600 font-semibold hover:underline">
              {showPercent ? "Hide Details ▲" : "Read More ▼"}
            </button>
            <AnimatePresence>
              {showPercent && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35 }} className="mt-3 text-sm text-gray-600">
                  Causes: complex schedules, side-effect fears, costs, or poor understanding. Our platform targets the root cause.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Card 2 */}
          <motion.div className="bg-white p-6 rounded-xl shadow-md border border-sky-100"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-5xl font-extrabold text-sky-500">125K+</p>
            <p className="mt-2 font-medium text-gray-700">annual deaths linked to non-adherence</p>
            <button onClick={() => setShowDeaths(!showDeaths)} className="text-sky-600 font-semibold hover:underline">
              {showDeaths ? "Hide Details ▲" : "Read More ▼"}
            </button>
            <AnimatePresence>
              {showDeaths && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35 }} className="mt-3 text-sm text-gray-600">
                  Preventable complications, hospital admissions, and mortality are reduced by early detection.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Card 3 */}
          <motion.div className="bg-white p-6 rounded-xl shadow-md border border-sky-100"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-4xl font-extrabold text-sky-500">AI Insight</p>
            <p className="mt-2 font-medium text-gray-700">Predicts adherence risk and suggests interventions.</p>
            <button onClick={() => setShowAI(!showAI)} className="text-sky-600 font-semibold hover:underline">
              {showAI ? "Hide Details ▲" : "Read More ▼"}
            </button>
            <AnimatePresence>
              {showAI && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35 }} className="mt-3 text-sm text-gray-600">
                  Combines adherence history, vitals, and contextual signals for accurate predictions.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sky-600 text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2025 MediTrack-AI. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="#" className="hover:text-sky-200">About Us</a>
            <a href="#" className="hover:text-sky-200">Developers</a>
            <a href="#" className="hover:text-sky-200">Privacy Policy</a>
            <a href="#" className="hover:text-sky-200">Terms & Conditions</a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal show={showLogin} onClose={() => setShowLogin(false)} onLogin={handleLogin} />
      <SignupModal show={showSignup} onClose={() => setShowSignup(false)} onSignup={handleLogin} />
    </div>
  );
}

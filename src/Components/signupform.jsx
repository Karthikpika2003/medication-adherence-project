import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupForm({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (email && password) {
      if (role === "doctor") navigate("/doctor");
      else navigate("/patient");
      onClose();
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <h2 className="text-2xl font-bold text-center">Sign Up</h2>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="px-4 py-2 border rounded"
      >
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-4 py-2 border rounded"
      />
      <button
        onClick={handleSignup}
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Sign Up
      </button>

      <div className="flex flex-col gap-2 mt-2">
        <button className="bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Continue with Google
        </button>
        <button className="bg-gray-800 text-white py-2 rounded hover:bg-gray-900">
          Continue with GitHub
        </button>
      </div>
    </div>
  );
}

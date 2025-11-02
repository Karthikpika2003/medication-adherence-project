import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from '../services/api';

export default function SignupForm({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Call real API
      const response = await authAPI.signup({ name, email, password, role });
      
      // Save token
      localStorage.setItem('authToken', response.data.token);
      
      // Save user info
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect based on role
      if (role === "doctor") {
        navigate("/doctor");
      } else {
        navigate("/patient");
      }
      
      onClose();
      
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {error && (
        <div style={{ 
          color: '#721c24', 
          backgroundColor: '#f8d7da', 
          padding: '10px', 
          borderRadius: '5px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />

      <select 
        value={role} 
        onChange={(e) => setRole(e.target.value)}
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      >
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>

      <button 
        onClick={handleSignup}
        disabled={loading}
        style={{
          padding: "12px",
          backgroundColor: loading ? "#ccc" : "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "16px"
        }}
      >
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>
    </div>
  );
}

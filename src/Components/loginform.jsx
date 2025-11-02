import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from '../services/api';

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Call real API
      const response = await authAPI.login({ email, password, role });
      
      // Save token to localStorage
      localStorage.setItem('authToken', response.data.token);
      
      // Save user info
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect based on role
      if (role === "doctor") {
        navigate("/doctor");
      } else {
        navigate("/patient");
      }
      
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
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
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
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
        type="submit" 
        disabled={loading}
        style={{
          padding: "12px",
          backgroundColor: loading ? "#ccc" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "16px"
        }}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

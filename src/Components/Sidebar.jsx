// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside style={{
      width: "200px",
      background: "#eee",
      padding: "1rem",
      height: "100vh",
      boxSizing: "border-box"
    }}>
      <h3>Dashboard</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ margin: "0.5rem 0" }}>
          <Link to="/doctor" style={{ textDecoration: "none", color: "#333" }}>
            Doctor
          </Link>
        </li>
        <li style={{ margin: "0.5rem 0" }}>
          <Link to="/patient" style={{ textDecoration: "none", color: "#333" }}>
            Patient
          </Link>
        </li>
        <li style={{ margin: "0.5rem 0" }}>
          <Link to="/records" style={{ textDecoration: "none", color: "#333" }}>
            Records
          </Link>
        </li>
        <li style={{ margin: "0.5rem 0" }}>
          <Link to="/settings" style={{ textDecoration: "none", color: "#333" }}>
            Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
}

  
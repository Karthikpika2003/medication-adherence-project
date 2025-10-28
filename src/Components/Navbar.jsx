// src/components/Navbar.jsx
export default function Navbar() {
    return (
      <nav style={{
        background: "#4CAF50",
        color: "white",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
      }}>
        <div>🚀 Meditrack AI</div>
        <div>
          <a href="/" style={{ color: "white" }}>Home</a>
        </div>
      </nav>
    );
  }
  
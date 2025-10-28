export default function Card({ title, value, bgColor }) {
    return (
      <div style={{
        background: bgColor || "#fff",
        padding: "1rem",
        margin: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        flex: 1,
        minWidth: "200px"
      }}>
        <h3>{title}</h3>
        <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{value}</p>
      </div>
    );
  }
  
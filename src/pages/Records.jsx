import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Card from "../Components/card";

export default function Records() {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ padding: "1rem", flex: 1 }}>
          <h2>📄 Patient Records</h2>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Card title="Patient A" value="Diabetes, BP" bgColor="#f9c74f" />
            <Card title="Patient B" value="Heart Issues" bgColor="#90be6d" />
            <Card title="Patient C" value="Vitamin Deficiency" bgColor="#f94144" />
          </div>
        </div>
      </div>
    </div>
  );
}

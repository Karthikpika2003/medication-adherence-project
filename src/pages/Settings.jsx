import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

export default function Settings() {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ padding: "1rem", flex: 1 }}>
          <h2>⚙️ Settings</h2>
          <form style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
            <label>
              Username:
              <input type="text" placeholder="Enter username" style={{ margin: "0.5rem 0" }} />
            </label>
            <label>
              Email:
              <input type="email" placeholder="Enter email" style={{ margin: "0.5rem 0" }} />
            </label>
            <label>
              Password:
              <input type="password" placeholder="Enter new password" style={{ margin: "0.5rem 0" }} />
            </label>
            <button type="submit" style={{ marginTop: "1rem", padding: "0.5rem" }}>Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}

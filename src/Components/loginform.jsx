import { useState } from "react";

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(role); // sends role back to Home
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded-lg p-2 w-full"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded-lg p-2 w-full"
        required
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border rounded-lg p-2 w-full"
      >
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
      >
        Login
      </button>

      <div className="flex justify-center space-x-3 mt-2">
        <button type="button" className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition">Sign in with Google</button>
        <button type="button" className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition">GitHub</button>
      </div>
    </form>
  );
}

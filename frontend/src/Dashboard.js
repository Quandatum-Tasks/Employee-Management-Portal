import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      {/* Logout button outside main card */}
      <button onClick={logout} className="logout-btn">Logout</button>

      {/* Main card content */}
      <div className="main-card">
        <h2>Welcome, {user?.name}</h2>

        <h3 style={{ marginTop: "20px" }}>What would you like to manage?</h3>

        <button
          onClick={() => navigate("/employees")}
          style={{ marginTop: "15px" }}
        >
          Go to Employee Management
        </button>
      </div>
    </div>
  );
}

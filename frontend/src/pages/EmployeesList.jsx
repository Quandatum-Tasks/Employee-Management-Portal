import React, { useEffect, useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await API.get("employees/");
      setEmployees(res.data);
    } catch (error) {
      alert("Error fetching employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await API.delete(`employees/${id}/`);
      alert("Employee deleted");
      fetchEmployees();
    } catch (err) {
      alert("Error deleting employee");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      {/* Logout button outside */}
      <button onClick={logout} className="logout-btn">Logout</button>

      {/* Main card with table */}
      <div className="main-card">
        <div className="top-bar">
          <h2>Employees List</h2>
          <button onClick={() => navigate("/employees/add")} className="add-btn">
            Add Employee
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Role</th>
              <th>Salary</th><th>Joining Date</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                  <td>{emp.salary}</td>
                  <td>{emp.joining_date}</td>
                  <td>{emp.status}</td>
                  <td>
                    <Link to={`/employees/edit/${emp.id}`}>Edit</Link> |{" "}
                    <button
                      onClick={() => deleteEmployee(emp.id)}
                      style={{ background: "transparent", color: "#fff", border: "none", cursor: "pointer" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7">No employees found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

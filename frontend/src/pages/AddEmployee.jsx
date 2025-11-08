import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    role: "",
    salary: "",
    joining_date: "",
    status: "Active",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await API.post("employees/", employee);
      alert("Employee added successfully");
      navigate("/employees");
    } catch (err) {
      alert("Error adding employee");
    }
  };

  return (
    <div className="main-card">
      <h2>Add Employee</h2>

      <form onSubmit={submitForm}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={employee.name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={employee.role}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={employee.salary}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>Joining Date: </label>
        <input
          type="date"
          name="joining_date"
          value={employee.joining_date}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>Status: </label>
        <select
          name="status"
          value={employee.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <br /><br />

        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

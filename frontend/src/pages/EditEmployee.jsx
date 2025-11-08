import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    role: "",
    salary: "",
    joining_date: "",
    status: "Active",
  });

  const fetchEmployee = async () => {
    try {
      const res = await API.get("employees/");
      const emp = res.data.find((e) => e.id === parseInt(id));
      setEmployee(emp);
    } catch (err) {
      alert("Error fetching employee details");
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const updateForm = async (e) => {
    e.preventDefault();
    try {
      await API.put(`employees/${id}/`, employee);
      alert("Employee updated successfully");
      navigate("/employees");
    } catch (err) {
      alert("Error updating employee");
    }
  };

  return (
    <div className="main-card">
      <h2>Edit Employee</h2>

      <form onSubmit={updateForm}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={employee?.name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee?.email}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={employee?.role}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={employee?.salary}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>Joining Date: </label>
        <input
          type="date"
          name="joining_date"
          value={employee?.joining_date}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>Status: </label>
        <select
          name="status"
          value={employee?.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <br /><br />

        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
}

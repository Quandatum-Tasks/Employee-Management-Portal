import React, {useState} from 'react';
import API from './api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('register/', {name, email, password});
      alert('Registered! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Error registering: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>Register</h2>

      <form onSubmit={submit}>
        <input 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Name"
          required
        />
        <input 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="Email"
          type="email"
          required
        />
        <input 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="Password" 
          type="password"
          required
        />

        <button type="submit">Register</button>
      </form>

      <p className="auth-link">
        Already have an account? <span onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
  </div>
);

}

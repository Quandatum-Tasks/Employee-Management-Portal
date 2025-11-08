import React, {useState} from 'react';
import API from './api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('login/', {email, password});
      // store login info in localStorage
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('Login successful');
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.error || err.message));
    }
  };

return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>Login</h2>

      <form onSubmit={submit}>
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
        <button type="submit">Login</button>
      </form>

      <p className="auth-link">
        Don’t have an account? <span onClick={() => navigate("/register")}>Register</span>
      </p>
    </div>
  </div>
);

}

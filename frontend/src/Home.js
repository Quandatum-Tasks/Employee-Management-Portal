import React, {useEffect, useState} from 'react';
import API from './api';
import { Link } from 'react-router-dom';

export default function Home(){
  const [msg, setMsg] = useState('');
  useEffect(()=> {
    API.get('message/')
      .then(res => setMsg(res.data.message))
      .catch(err => console.error(err));
  }, []);
  return (
    <div style={{padding:20}}>
      <h1>{msg || 'Loading...'}</h1>
      <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
    </div>
  );
}

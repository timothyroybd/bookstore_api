import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = ({setToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignupNavigation = () => {
    navigate('/signup')
  }
  

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      const token = response.data.token;
      console.log('This is the whole response data:', response);
      console.log('This is the whole token data:', token);
      if(token){
        setToken(token)
        navigate('/library')
      }
      
    } catch (err) {
      console.error('login failed', err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        placeholder="Please enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Please enter your email"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      <button onClick={handleSignupNavigation}>Sign Up</button>
    </form>
  );
};

export default Login
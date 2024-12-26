import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import "../index.css"

const Login = ({setToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [emailPlaceHolder, setEmailPlaceHolder] =useState('youemail@mail.com')
   const [passwordPlaceHolder, setpasswordPlaceHolder] =useState('*********')

  const handleSignupNavigation = () => {
    navigate('/signup')
  }
  

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      console.log('Login response:', response.data);
      const token = response.data?.accessToken;
      if (!token) { 
        console.error('Token is undefined:', response.data); 
        return; }
      console.log('This is the whole response data:', response);
      console.log('This is the whole token data:', token);
      setToken(token)
      localStorage.setItem('token', token)
      navigate('/library')
      // if(token){
      //   setToken(token)
      //   navigate('/library')
      // }
      
    } catch (err) {
      console.error('login failed', err);
    }
  };

  const emailHandleFocus = () => {
    setEmailPlaceHolder('')
  }
   const passwordHandleFocus = () => {
    setpasswordPlaceHolder('')
  }

  const emailHandleBlur = () => {
    if(emailPlaceHolder === "") {
      setEmailPlaceHolder('youemail@mail.com')
    }
  }
   const passwordHandleBlur = () => {
    if(passwordPlaceHolder === "") {
      setpasswordPlaceHolder('*********')
    }
  }

  return (
    <form onSubmit={handleLogin} className='max-w-lg mx-auto mt-56 p-5 border rounded-lg shadow-lg bg-white '>
      <div>
      <lable>Email</lable>
      <input className = 'w-full p-3 mb-6 border rounded'
        type="email"
        value={email}
        placeholder= {emailPlaceHolder}
        onFocus={emailHandleFocus}
        onBlur={emailHandleBlur}
        onChange={(e) => setEmail(e.target.value)
        
        }
      />
      </div>
      <div>
        <lable>Password</lable>
      <input className = 'w-full p-3 mb-6 border rounded'
        type="password"
        value={password}
        placeholder= {passwordPlaceHolder}
        onFocus={passwordHandleFocus}
        onBlur={passwordHandleBlur}
        onChange={(e) => setPassword(e.target.value)}
      />
      </div>
      <button className ="w-full text-lg p-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors" type="submit">Login</button>
      <button className= "w-full text-lg p-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"onClick={handleSignupNavigation}>Sign Up</button>
    </form>
  );
};

export default Login
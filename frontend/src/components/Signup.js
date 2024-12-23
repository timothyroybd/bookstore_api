import React, {useState} from 'react';
import api from '../services/api';
import {useNavigate} from 'react-router-dom'


const Signup = () => {

    const [username, setUsername]= useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleSignUp = async(e) => {
        e.preventDefault()
        try{    
            await api.post('/auth/register', {username, email, password})
            navigate('/')
        }
        catch(err){
            console.error(`Signup failed ${err}`)
        }
        

    }

  return (
    <form onSubmit={handleSignUp}>
        <input type='text' value ={username} onChange={(e)=> setUsername(e.target.value)} />

        <input type='email' value ={email} onChange={(e)=> setEmail(e.target.value)} />

        <input type='password' value ={password} onChange={(e)=> setPassword(e.target.value)} />

        <button type='submit'>Signup</button>


        

    </form>
  );
};

export default Signup;
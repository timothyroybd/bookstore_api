import React, {useState} from 'react';
import api from '../services/api';
import {useNavigate} from 'react-router-dom'
import '../styles/Form.css'


const Signup = ({setToken}) => {

    const [username, setUsername]= useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleSignUp = async(e) => {
        e.preventDefault()
        try{  
            const response = await api.post('/auth/register', {username, email, password})
            const token = response.data.token
            console.log(`signup response: ${response}`)
            if(token){
                console.log(`this is the token: ${token} and I am logging from signup right after register token`)
                setToken(token)
                navigate('/library')
            }
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
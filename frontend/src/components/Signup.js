import React, {useState} from 'react';
import api from '../services/api';
import {useNavigate} from 'react-router-dom'
import '../styles/Form.css'
import "../index.css"


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
    <form className='max-w-md mx-auto mt-24 p-6 bg-white shadow-md rounded-lg' onSubmit={handleSignUp}>
        <h2 className='text-2xl font-bold mb-6 text-gray-900'></h2>
        <div>
        <label for ='username' className='block mb-2 text-sm font-medium text-gray-900 text-gray-900' >Username</label>
        <input type='text' value ={username} onChange={(e)=> setUsername(e.target.value)} 
        className='block w-full p-2 mb-4 border border-gray-300 rounded-lg'/>
        </div>

        <div>
        <label for ='email' className='block mb-2 text-sm font-medium text-gray-900 text-gray-900' >Email</label>

        <input type='email' value ={email} onChange={(e)=> setEmail(e.target.value)} 
        className='block w-full p-2 mb-4 border border-gray-300 rounded-lg'/>
        </div>

        <div>
        <label for ='password' className='block mb-2 text-sm font-medium text-gray-900 text-gray-900' >Password</label>

        <input type='password' value ={password} onChange={(e)=> setPassword(e.target.value)} 
        className='block w-full p-2 mb-4 border border-gray-300 rounded-lg'/>

        <button type='submit'
        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Signup</button>
        </div>


        

    </form>
  );
};

export default Signup;
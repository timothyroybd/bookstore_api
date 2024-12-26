import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaEdit } from 'react-icons/fa';
const Profile = ({ token }) => {
  const [user, setUser] = useState({ username: '', email: '', password: '' });
  const [editingField, setEditingField] = useState('')

  useEffect(() => {
    const fetchUser = async() => {
        try{
            const response = await api.get('/auth/profile', {
                headers: {Authorization: `Bearer ${token}`}
            })
            setUser({...response.data, password: ''})
        }catch(err){
            console.error('Error detching user data', err)
        }
    }
    fetchUser()
    // console.log('Fetched user:', response.data);
  }, [token])

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setUser({...user, [name]: value})
  }
  const handleBlur = async() => {
    try{
        await api.put('/auth/profile', user, {
            headers: {Authorization: `Bearer ${token}`}
        })
        setEditingField('')
    }
    catch(err){
        console.error('Error updating profile', err)
    }
  }

  return (
    <div className='container mx-auto px-4 py-8 mb-4'>
      <h2 className='text-2xl font-bold mb-4'>Profile</h2>
      <div>
        <label className='block text-gray-700 text-sm font-bold mb-1'>Username:</label>
        {editingField === 'username' ? (
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoFocus
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

          />
        ) : (
          <div onClick={() => setEditingField('username')}>
            {user.username} <FaEdit />
          </div>
        )}
      </div>
      <div>
        <label className='block text-gray-700 text-sm font-bold mb-1'>Email: </label>
        {editingField === 'email' ? (
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoFocus
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

          ></input>
        ) : (
          <div onClick={() => setEditingField('email')}>
            {user.email} <FaEdit />{' '}
          </div>
        )}
      </div>
      <div>
        <label className='block text-gray-700 text-sm font-bold mb-1'>Password: </label>
        {editingField === 'password' ? (
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoFocus className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

          />
        ) : (
          <div onClick={() => setEditingField('password')}>
            Change Passord <FaEdit />{' '}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

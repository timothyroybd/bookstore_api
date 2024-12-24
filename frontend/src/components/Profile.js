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
                headers: {'x-auth-token': token}
            })
            setUser({...response.data, password: ''})
        }catch(err){
            console.error('Error detching user data', err)
        }
    }
    fetchUser()
  }, [token])

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setUser({...user, [name]: value})
  }
  const handleBlur = async() => {
    try{
        await api.put('/auth/profile', user, {
            headers: {'x-auth-token': token}
        })
        setEditingField('')
    }
    catch(err){
        console.error('Error updating profile', err)
    }
  }

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <label>Username:</label>
        {editingField === 'username' ? (
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          <div onClick={() => setEditingField('username')}>
            {user.username} <FaEdit />
          </div>
        )}
      </div>
      <div>
        <label>Email: </label>
        {editingField === 'email' ? (
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoFocus
          ></input>
        ) : (
          <div onClick={() => setEditingField('email')}>
            {user.email} <FaEdit />{' '}
          </div>
        )}
      </div>
      <div>
        <label>Password: </label>
        {editingField === 'password' ? (
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoFocus
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

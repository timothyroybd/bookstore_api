import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddBook = ({ token }) => {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  
    const handleAddBook = async (e) => {
      e.preventDefault()
      try {
        const response = api.post(
          '/books/register',
          { title, author, description },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        )
        console.log(response.data);
        setTitle('');
        setAuthor('');
        setDescription('');
        navigate('/library')
      } catch (err) {
        console.error('Error adding book', err);
      }
    };
 

  return (
    <div className='container mx-auto px-4 py-8'>
    <form onSubmit={handleAddBook} className='bg-white shadow-md rounded px-8 pt-6 mb-2'>
      <div className='container mx-auto px-4 py-4'>
        <label className='block text-gray-700 text-sm font-bold mb-1 ' htmlFor="title">Title</label>
         <input
         className='shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder="Title"
        required
      />
      </div>

     

      <div className='container mx-auto px-4 py-4'>
        <label className='block text-gray-700 text-sm font-bold mb-1 ' htmlFor="author">Author</label>
         <input
         className='shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        type="text"
        value={author}
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
        placeholder="Author"
        required
      />
      </div>

      <div className='container mx-auto px-4 py-4'>
        <label className='block text-gray-700 text-sm font-bold mb-1 ' htmlFor="description">Description</label>
         <input
         className='shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        type="text"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        placeholder="Description"
        required
      />
      </div>
      
     
     

      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 mb-6 ml-3 rounded focus:outline-none' type="submit"> Add Book</button>
    </form>
    </div>
  );
};

export default AddBook
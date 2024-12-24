import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AddBook = ({ token }) => {
  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  
    const handleAddBook = async () => {
      try {
        const response = api.post(
          '/books/register',
          { title, author, description },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setTitle('');
        setAuthor('');
        setDescription('');
      } catch (err) {
        console.error('Error adding book', err);
      }
    };
 

  return (
    <form onSubmit={handleAddBook}>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={author}
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
        placeholder="Author"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        placeholder="Description"
        required
      />

      <button type="submit"> Add Book</button>
    </form>
  );
};

export default AddBook
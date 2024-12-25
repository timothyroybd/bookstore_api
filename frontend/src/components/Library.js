//Importing necessary libraries

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Library = ({ initialToken }) => {
  const navigate = useNavigate()
  const [token, setToken] = useState(initialToken || localStorage.getItem('token'))

  const [books, setBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null);
  const [editedBook, setEditedBook] = useState({
    title: '',
    author: '',
    description: '',
  });

  useEffect(() => {
    const fetchBooks = async () => {
      if (!token) {
        console.log('No token, skipping fetch');
        return;
      }
      try {
         console.log('Token used for fetching books (fetchBooks)', token)
        const response = await api.get('/books', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Fetched books response:', response.data);
        setBooks(response.data);
        
      } catch (err) {
        console.error(`Error fetching books: ${err}`);
      }
    };
    fetchBooks();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({ ...editedBook, [name]: value });
  };

  const handleEditClick = (book) => {
    setEditingBookId(book._id);
    setEditedBook({
      title: book.title,
      author: book.author,
      description: book.description,
    });
  };

  const handleUpdateBook = async (e, id) => {
    e.preventDefault();
    try {
      await api.put(`/books/${id}`, editedBook, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const updatedBooks = books.map((book) =>
        book._id === id ? { ...book, ...editedBook } : book
      );
      setBooks(updatedBooks);
      setEditingBookId(null);
    } catch (err) {
      console.error('error updating book:', err);
    }
  };
  const handleDeleteClick = async(id) => {
    if(window.confirm('Are you sure you want to delete this books?')){
      try{
        await api.delete(`/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setBooks(books.filter((book) => book._id !== id))
      } catch(err){
        console.error('Error deleting book:', err)
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    navigate('/')
  }

  return (
    <div>
      <h1> Library</h1>
      <Link to="/profile">Profile</Link>
      <Link to="/addbook"> AddBoook</Link>
      <button onClick={handleLogout}> Sing Out</button>

      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {' '}
            {editingBookId === book._id ? (
              <form onSubmit={(e) => handleUpdateBook(e, book._id)}>
                <input
                  type="text"
                  name="title"
                  value={editedBook.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  required
                ></input>
                <input
                  type="text"
                  name="author"
                  value={editedBook.author}
                  onChange={handleInputChange}
                  placeholder="Author"
                  required
                ></input>
                <input
                  type="text"
                  name="description"
                  value={editedBook.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  required
                ></input>
                <button type="submit">Save</button>
              </form>
            ) : (
              <div>
                {book.title} by {book.author}
                <FaEdit
                  onClick={() => handleEditClick(book)}
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                />
                <FaTrash
                  onClick={() => handleDeleteClick(book._id)}
                  style={{ cursor: 'pointer', marginLeft: '10px', color: 'red' }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Library;

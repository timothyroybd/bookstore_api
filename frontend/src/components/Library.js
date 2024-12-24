import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {Link} from "react-router-dom"
import AddBook from './AddBook';
import { FaEdit } from 'react-icons/fa';
import { FaE } from 'react-icons/fa6';

const Library = ({ token }) => {
  const [books, setBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null)
  const [editedBook, setEditedBook] = useState({title: '', author: '', description: ''})

  useEffect(() => {
    console.log('This is actual books value', books);
  }, [books]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!token) {
        console.log('No token, skipping fetch');
        return;
      }
      try {
        // console.log('Token used for fetching books (fetchBooks)', token)
        const response = await api.get('/books', {
          headers: {
            'x-auth-token': token,
          },
        });
        console.log(response.data);
        setBooks(response.data);
        console.log(`I am running from Library.js and the token value is ${token}`)
        
        console.log(books);

        console.log('This is actual books value', books);
      } catch (err) {
        console.error(`Error fetching books: ${err}`);
      }
    };
    fetchBooks();
  }, [token]);

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setEditedBook({...editedBook, [name]: value})
  }

  const handleEditClick = (book) => {
    setEditingBookId(book._id)
    setEditedBook({title: book.title, author: book.author, description: book.description})
  }

  const handleUpdateBook = async(e,id) => {
    e.preventDefault();
    try{
      await api.put(`/books/${id}`, editedBook, {
        headers: {
          'x-auth-token': token
        }
      })

      const updatedBooks = books.map((book)=> book._id === id ? {...book, ...editedBook} : book)
      setBooks(updatedBooks)
      setEditingBookId(null)
    }catch(err){
      console.error('error updating book:', err)
    }
  }

  return (
    <div>
      <h1> Library</h1>
      <Link to ="/profile">Profile</Link>
      <Link to ="/addbook"> AddBoook</Link>

      <ul>
        {books.map((book) => (
          <li key={book._id}> {editingBookId === book._id ? (
            <form onSubmit={(e) => handleUpdateBook(e, book._id)}>
              <input type="text" name="title" value ={editedBook.title} onChange={handleInputChange} placeholder='Title' required></input>
              <input type="text" name="author" value ={editedBook.author} onChange={handleInputChange} placeholder='Author' required></input>
              <input type="text" name="description" value ={editedBook.description} onChange={handleInputChange} placeholder='Description' required></input>
              <button type= "submit">Save</button>

            </form>
          ): (
            <div>
              {book.title} by {book.author}
              <FaEdit onClick={()=> handleEditClick(book)} style = {{cursor: 'pointer', marginLeft: '10px'}}/>
            </div>
          )}</li>
        ))}
      </ul>
    </div>
  );
};

export default Library;

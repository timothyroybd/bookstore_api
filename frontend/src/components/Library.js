import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {Link} from "react-router-dom"

const Library = ({ token }) => {
  const [books, setBooks] = useState([]);
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

  return (
    <div>
      <h1> Library</h1>
      <Link to ="/profile">Profile</Link>

      <ul>
        {books.map((book) => (
          <li key={book._id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Library;

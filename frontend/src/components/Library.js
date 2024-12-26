import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/Form.css';

const Library = ({ initialToken }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(initialToken || localStorage.getItem('token'));
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
        console.log('Token used for fetching books (fetchBooks)', token);
        const response = await api.get('/books', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched books response:', response.data);
        setBooks(response.data);
      } catch (err) {
        console.error(`Error fetching books: ${err}`);
      }
    };
    fetchBooks();
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({ ...editedBook, [name]: value });
  };

  const handleEditClick = (book) => {
    console.log('Edit button clicked for book:', book);
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
          Authorization: `Bearer ${token}`,
        },
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

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await api.delete(`/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBooks(books.filter((book) => book._id !== id));
      } catch (err) {
        console.error('Error deleting book:', err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="container mx-auto px-4">
      {token && (
        <div>
          <nav>
            <div className="container mx-auto px-12 flex justify-between items-center py-3">
              <div className="flex items-center">
                <Link to="/profile" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">Profile</Link>
                <Link to="/addbook" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">Add Book</Link>
              </div>
              <div className="flex items-center">
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Sign Out</button>
              </div>
            </div>
          </nav>
        </div>
      )}
      {token ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book._id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between">
              <div className="flex-1">
                {editingBookId === book._id ? (
                  <form onSubmit={(e) => handleUpdateBook(e, book._id)}>
                    <input
                      type="text"
                      name="title"
                      value={editedBook.title}
                      onChange={handleInputChange}
                      placeholder="Title"
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <input
                      type="text"
                      name="author"
                      value={editedBook.author}
                      onChange={handleInputChange}
                      placeholder="Author"
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <input
                      type="text"
                      name="description"
                      value={editedBook.description}
                      onChange={handleInputChange}
                      placeholder="Description"
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save</button>
                  </form>
                ) : (
                  <>
                    <h1 className="text-xl font-bold text-gray-900">{book.title}</h1>
                    <p className="text-gray-600">{book.author}</p>
                    <p className="text-gray-600">{book.description}</p>
                  </>
                )}
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <FaEdit
                  onClick={() => handleEditClick(book)}
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                />
                <FaTrash
                  onClick={() => handleDeleteClick(book._id)}
                  className="cursor-pointer text-red-500 hover:text-red-700"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You must log in to view the books.</p>
      )}
    </div>
  );
};

export default Library;

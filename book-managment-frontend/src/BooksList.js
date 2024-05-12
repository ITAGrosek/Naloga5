import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BooksList.css';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [showBooks, setShowBooks] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [newBook, setNewBook] = useState({ title: '', author: '', isbn: '', genre: '' });
  const [showAddBookForm, setShowAddBookForm] = useState(false);

  useEffect(() => {
    axios.get('http://bff-web:3000/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error("Error fetching books:", error));
  }, []);
  

  const toggleBooksVisibility = () => setShowBooks(!showBooks);

  const handleDelete = (bookId) => {
    if (window.confirm('Ali ste prepričani, da želite izbrisati knjigo?')) {
      axios.delete(`http://bff-web:3000/api/books/${bookId}`)
        .then(() => setBooks(books.filter(book => book.id !== bookId)))
        .catch(error => console.error('Error deleting book:', error));
    }
  };
  
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    axios.put(`http://bff-web:3000/api/books/${editingBook.id}`, editingBook)
      .then(() => {
        setBooks(books.map(book => book.id === editingBook.id ? editingBook : book));
        setEditingBook(null);
      })
      .catch(error => console.error('Error updating book:', error));
  };
  
  const handleAddBook = (e) => {
    e.preventDefault();
    axios.post('http://bff-web:3000/api/books', newBook)
      .then(response => {
        setBooks([...books, response.data]);
        setNewBook({ title: '', author: '', isbn: '', genre: '' });
        setShowAddBookForm(false);
      })
      .catch(error => console.error('Error adding book:', error));
  };
  

  return (
    <div className="book-list-container">
      <header className="header">
        <h1>Seznam knjig</h1>
        <button onClick={() => setShowAddBookForm(!showAddBookForm)} className="add-book-button">
          {showAddBookForm ? 'Prekliči' : 'Dodaj novo knjigo'}
        </button>
        <button onClick={toggleBooksVisibility} className="toggle-button">
          {showBooks ? 'Skrij' : 'Prikaži'} vse knjige
        </button>
      </header>

      {showAddBookForm && (
        <form onSubmit={handleAddBook} className="add-book-form">
          <input
            type="text"
            placeholder="Naslov"
            value={newBook.title}
            onChange={e => setNewBook({ ...newBook, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Avtor"
            value={newBook.author}
            onChange={e => setNewBook({ ...newBook, author: e.target.value })}
          />
          <input
            type="text"
            placeholder="ISBN"
            value={newBook.isbn}
            onChange={e => setNewBook({ ...newBook, isbn: e.target.value })}
          />
          <input
            type="text"
            placeholder="Zvrst"
            value={newBook.genre}
            onChange={e => setNewBook({ ...newBook, genre: e.target.value })}
          />
          <button type="submit">Dodaj knjigo</button>
        </form>
      )}

      {editingBook && (
        <form onSubmit={handleSubmitEdit} className="edit-form">
          <input
            type="text"
            value={editingBook.title}
            onChange={e => setEditingBook({ ...editingBook, title: e.target.value })}
          />
          <input
            type="text"
            value={editingBook.author}
            onChange={e => setEditingBook({ ...editingBook, author: e.target.value })}
          />
          <input
            type="text"
            value={editingBook.isbn}
            onChange={e => setEditingBook({ ...editingBook, isbn: e.target.value })}
          />
          <button type="submit">Shrani spremembe</button>
          <button type="button" onClick={handleCancelEdit}>Prekliči</button>
        </form>
      )}

      {showBooks && (
        <ul className="books">
          {books.map(book => (
            <li key={book.id} className="book">
              <div className="book-details">
                <span>Naslov: {book.title || 'N/A'}</span>
                <span>Avtor: {book.author || 'Neznano'}</span>
                <span>ISBN: {book.isbn || 'Neznano'}</span>
                <span>Zvrst: {book.genre || 'Neznano'}</span>
              </div>
              <div className="book-actions">
                <button onClick={() => handleEditClick(book)} className="edit-button">Uredi</button>
                <button onClick={() => handleDelete(book.id)} className="delete-button">Izbriši</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BooksList;

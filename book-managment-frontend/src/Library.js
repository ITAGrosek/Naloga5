import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Library = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/books')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the books: ", error);
      });
  }, []);

  return (
    <div>
      <h1>Knjižnica</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Library;

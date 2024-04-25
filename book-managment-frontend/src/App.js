// App.js v book-management-frontend
import React from 'react';
import BooksList from './BooksList';
import Navigation from 'navigation/navigation'; // Dodaj to vrstico

function App() {
  return (
    <div className="App">
      <Navigation /> {/* Prikaži navigacijsko vrstico na vrhu */}
      <BooksList />
    </div>
  );
}

export default App;

// App.js
import React from 'react';
import BooksList from './BooksList'; // Dodaj ta import

function App() {
  const handleBack = () => {
    window.location.href = 'http://localhost:6999';
  };

  return (
    <div className="App">
      <button onClick={handleBack}>Nazaj na navigacijo</button>
      <BooksList/>
    </div>
  );
}

export default App;





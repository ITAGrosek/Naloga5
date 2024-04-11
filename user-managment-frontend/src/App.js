// App.js
import React from 'react';
import UserApp from './UserApp'; // Dodaj ta import

function App() {
  return (
    <div className="App">
      <h1>Pridobi uporabnike</h1> {/* Dodaj to vrstico */}
      <UserApp /> {/* Uporabi komponento tukaj */}
    </div>
  );
}

export default App;
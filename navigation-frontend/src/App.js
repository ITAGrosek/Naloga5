import React from 'react';
import Navigation from './navigation'; // Spremenite pot, če je potrebno
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Tu uporabimo našo Navigation komponento */}
        <Navigation />
      </header>
      <main>
        <p>Dobrodošli na navigacijski strani!</p>
      </main>
    </div>
  );
}

export default App;

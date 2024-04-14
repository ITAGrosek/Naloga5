// App.js
import React from 'react';
import './App.css';
import ReservationManagement from './ReservationManagement';

function App() {
  const handleBack = () => {
    window.location.href = 'http://localhost:6999';
  };

  return (
    <div className="App">
      <button onClick={handleBack}>Nazaj na navigacijo</button>
      <ReservationManagement/>
    </div>
  );
}

export default App;



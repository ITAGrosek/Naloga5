


// App.js v book-management-frontend
import React from 'react';
import ReservationManagement from './ReservationManagement';
import Navigation from 'navigation/navigation'; // Dodaj to vrstico

function App() {
  return (
    <div className="App">
      <Navigation /> {/* Prikaži navigacijsko vrstico na vrhu */}
      <ReservationManagement/>
    </div>
  );
}

export default App;

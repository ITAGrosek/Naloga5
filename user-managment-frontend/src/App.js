
// App.js v book-management-frontend
import React from 'react';
import UserApp from './UserApp';
import Navigation from 'navigation/navigation'; // Dodaj to vrstico

function App() {
  return (
    <div className="App">
      <Navigation /> {/* Prikaži navigacijsko vrstico na vrhu */}
      <UserApp />
    </div>
  );
}

export default App;

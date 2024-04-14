// App.js
import React from 'react';
import UserApp from './UserApp';

function App() {
  const handleBack = () => {
    window.location.href = 'http://localhost:6999';
  };

  return (
    <div className="App">
      <button onClick={handleBack}>Nazaj na navigacijo</button>
      <UserApp />
    </div>
  );
}

export default App;

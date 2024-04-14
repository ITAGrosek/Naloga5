import React from 'react';
import './navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <a href="http://localhost:7002">User Management</a>
      <a href="http://localhost:7000">Book Management</a>
      <a href="http://localhost:7003">Reservation Management</a>
    </nav>
  );
};

export default Navigation;

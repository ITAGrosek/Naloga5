import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserApp.css';

const UserApp = () => {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  // State za urejanje in dodajanje uporabnikov
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    surname: '',
    age: '',
    email: '',
    username: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3000/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const toggleUsersVisibility = () => setShowUsers(!showUsers);

  const handleDelete = userId => {
    if (window.confirm('Ali ste prepričani, da želite izbrisati uporabnika?')) {
      axios.delete(`http://localhost:3000/api/users/${userId}`)
        .then(() => setUsers(users.filter(user => user.id !== userId)))
        .catch(error => console.error('Error deleting user:', error));
    }
  };

  const handleEditClick = user => setEditingUser({ ...user });

  const handleCancelEdit = () => setEditingUser(null);

  const handleSubmitEdit = e => {
    e.preventDefault();
    axios.put(`http://localhost:3000/api/users/${editingUser.id}`, editingUser)
      .then(() => {
        setUsers(users.map(user => user.id === editingUser.id ? editingUser : user));
        setEditingUser(null);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  // Dodajanje novega uporabnika
  const handleAddUser = e => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/users', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({ name: '', surname: '', age: '', email: '', username: '' }); // Reset obrazca
      })
      .catch(error => console.error('Error adding user:', error));
  };

  return (
    <div className="user-list-container">
      <header className="user-header">
        <h1>Seznam uporabnikov</h1>
        <button onClick={toggleUsersVisibility} className="toggle-button">
          {showUsers ? 'Skrij' : 'Prikaži'} vse uporabnike
        </button>
      </header>

      {/* Obrazec za dodajanje novega uporabnika */}
      <form onSubmit={handleAddUser} className="add-form">
        <input type="text" placeholder="Ime" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
        <input type="text" placeholder="Priimek" value={newUser.surname} onChange={e => setNewUser({ ...newUser, surname: e.target.value })} />
        <input type="number" placeholder="Starost" value={newUser.age} onChange={e => setNewUser({ ...newUser, age: e.target.value })} />
        <input type="email" placeholder="Email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
        <input type="text" placeholder="Uporabniško ime" value={newUser.username} onChange={e => setNewUser({ ...newUser, username: e.target.value })} />
        <button type="submit">Dodaj uporabnika</button>
      </form>

      {editingUser && (
        <form onSubmit={handleSubmitEdit} className="edit-form">
          <input type="text" value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} />
          <input type="text" value={editingUser.surname} onChange={(e) => setEditingUser({ ...editingUser, surname: e.target.value })} />
          <input type="number" value={editingUser.age} onChange={(e) => setEditingUser({ ...editingUser, age: e.target.value })} />
          <input type="email" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} />
          <button type="submit">Shrani spremembe</button>
          <button type="button" onClick={handleCancelEdit}>Prekliči</button>
        </form>
      )}
      {showUsers && (
        <ul className="users">
          {users.map(user => (
            <li key={user.username} className="user">
              <div className="user-details">
                <p>Ime: {user.name}</p>
                <p>Priimek: {user.surname}</p>
                <p>Starost: {user.age}</p>
                <p>Email: {user.email}</p>
                <p>Uporabniško ime: {user.username}</p>
              </div>
              <div className="user-actions">
                <button onClick={() => handleEditClick(user)} className="edit-button">Uredi</button>
                <button onClick={() => handleDelete(user.id)} className="delete-button">Izbriši</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserApp;

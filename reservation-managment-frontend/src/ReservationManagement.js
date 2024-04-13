import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReservationManagement.css';

const ReservationManagement = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedBookId, setSelectedBookId] = useState('');
  const [editingReservation, setEditingReservation] = useState(null);
  const [showReservations, setShowReservations] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const usersResponse = await axios.get('http://localhost:3000/api/users');
        const booksResponse = await axios.get('http://localhost:3000/api/books');
        const reservationsResponse = await axios.get('http://localhost:3000/api/reservations');
        setUsers(usersResponse.data);
        setBooks(booksResponse.data);
        setReservations(reservationsResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  const toggleReservationsVisibility = () => {
    setShowReservations(!showReservations);
  };

  const handleReservationSubmit = async (event) => {
    event.preventDefault();
    try {
      const newReservation = {
        userId: selectedUserId,
        bookId: selectedBookId,
      };
      const response = await axios.post('http://localhost:3000/api/reservations', newReservation);
      setReservations([...reservations, response.data]);
      alert('Rezervacija je bila uspešno dodana.');
    } catch (error) {
      console.error('Error submitting reservation:', error);
    }
  };

  const handleDelete = async (reservationId) => {
    if (window.confirm('Ali ste prepričani, da želite izbrisati rezervacijo?')) {
      try {
        await axios.delete(`http://localhost:3000/api/reservations/${reservationId}`);
        setReservations(reservations.filter(res => res.id !== reservationId));
      } catch (error) {
        console.error('Error deleting reservation:', error);
      }
    }
  };

  const handleEditClick = (reservation) => {
    setEditingReservation({ ...reservation });
  };

  const handleCancelEdit = () => {
    setEditingReservation(null);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/reservations/${editingReservation.id}`, {
        userId: editingReservation.userId,
        bookId: editingReservation.bookId,
        reservationDate: editingReservation.reservationDate,
        expectedReturnDate: editingReservation.expectedReturnDate
      });
      setReservations(reservations.map(res => res.id === editingReservation.id ? {...res, ...response.data} : res));
      setEditingReservation(null);
      alert('Rezervacija je bila uspešno posodobljena.');
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };
  
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="reservation-list-container">
      <header className="reservation-header">
        <h1>Upravljanje z rezervacijami</h1>
        <button onClick={toggleReservationsVisibility} className="toggle-button">
          {showReservations ? 'Skrij' : 'Prikaži'} vse rezervacije
        </button>
      </header>
      <form onSubmit={handleReservationSubmit} className="add-form">
        <div className="form-group">
          <label>
            Izberite uporabnika:
            <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Izberite knjigo:
            <select value={selectedBookId} onChange={(e) => setSelectedBookId(e.target.value)}>
              {books.map((book) => (
                <option key={book.id} value={book.id}>{book.title}</option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit">Ustvari rezervacijo</button>
      </form>

      {showReservations && (
        <ul className="reservations">
          {reservations.map(reservation => (
            <li key={reservation.id} className="reservation">
              <div className="reservation-details">
                <p>Uporabnik: {users.find(u => u.id === reservation.userId)?.name || 'Neznan'}</p>
                <p>Knjiga: {books.find(b => b.id === reservation.bookId)?.title || 'Neznana'}</p>
                <p>Datum rezervacije: {new Date(reservation.reservationDate).toLocaleDateString()}</p>
                <p>Pričakovani datum vrnitve: {new Date(reservation.expectedReturnDate).toLocaleDateString()}</p>
              </div>
              <div className="reservation-actions">
                <button onClick={() => handleEditClick(reservation)} className="edit-button">Uredi</button>
                <button onClick={() => handleDelete(reservation.id)} className="delete-button">Izbriši</button>
              </div>
            </li>
          ))}
        </ul>
      )}

{editingReservation && (
  <form onSubmit={handleSubmitEdit} className="edit-form">
    <label>
      Uporabnik:
      <select value={editingReservation.userId} onChange={(e) => setEditingReservation({...editingReservation, userId: e.target.value})}>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
    </label>
    <label>
      Knjiga:
      <select value={editingReservation.bookId} onChange={(e) => setEditingReservation({...editingReservation, bookId: e.target.value})}>
        {books.map(book => (
          <option key={book.id} value={book.id}>{book.title}</option>
        ))}
      </select>
    </label>
    <label>
      Datum rezervacije:
      <input
        type="datetime-local"
        value={new Date(editingReservation.reservationDate).toISOString().slice(0, 16)}
        onChange={(e) => setEditingReservation({...editingReservation, reservationDate: new Date(e.target.value).toISOString()})}
      />
    </label>
    <label>
      Pričakovani datum vrnitve:
      <input
        type="datetime-local"
        value={new Date(editingReservation.expectedReturnDate).toISOString().slice(0, 16)}
        onChange={(e) => setEditingReservation({...editingReservation, expectedReturnDate: new Date(e.target.value).toISOString()})}
      />
    </label>
    <button type="submit">Shrani spremembe</button>
    <button type="button" onClick={() => setEditingReservation(null)}>Prekliči</button>
  </form>
)}


    </div>
  );
};

export default ReservationManagement;

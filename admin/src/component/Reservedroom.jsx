// src/component/ReservedRooms.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const ReservedRooms = () => {
  const [reservedRooms, setReservedRooms] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReservedRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/reservedrooms');
        setReservedRooms(response.data);
      } catch (error) {
        setError('Error fetching reserved rooms');
      }
    };

    fetchReservedRooms();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/reservedrooms/${id}`);
      setReservedRooms(reservedRooms.filter(room => room._id !== id));
    } catch (error) {
      setError('Error deleting reserved room');
    }
  };

  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <Sidebar />
      <div className="content">
        <Header />
        <div className="container-fluid pt-4 px-4">
          <div className="bg-light rounded h-100 p-4">
            <h3 className="mb-4">Reserved Rooms</h3>
            {error && <p className="text-danger">{error}</p>}
            <div className="table-responsive">
              {reservedRooms.length > 0 ? (
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Price</th>
                      <th scope="col">Arrival Date</th>
                      <th scope="col">Departure Date</th>
                      <th scope="col">Guest Email</th>
                      <th scope="col">Message</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservedRooms.map((room, index) => (
                      <tr key={room._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{room.price ? `$${room.price.toFixed(2)}` : 'N/A'}</td>
                        <td>{new Date(room.arrivalDate).toLocaleDateString()}</td>
                        <td>{new Date(room.departureDate).toLocaleDateString()}</td>
                        <td>{room.email}</td>
                        <td>{room.message}</td>
                        <td>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(room._id)}>
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No reserved rooms found.</p>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
    </div>
  );
};

export default ReservedRooms;

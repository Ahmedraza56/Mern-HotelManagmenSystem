import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ReservationForm = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({
    arrivalDate: '',
    departureDate: '',
    email: '',
    message: '',
    room: ''
  });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleRoomChange = (event) => {
    const roomId = event.target.value;
    const room = rooms.find(r => r._id === roomId);
    setSelectedRoom(room);
    setFormData({ ...formData, room: roomId });
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting form with data:', formData);
    try {
      const response = await axios.post('http://localhost:5001/api/reservedroom', formData);
      console.log('Response from backend:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Reservation Complete',
        text: 'Your reservation is complete. A confirmation email has been sent to your email address.',
      });
      setFormData({
        arrivalDate: '',
        departureDate: '',
        email: '',
        message: '',
        room: ''
      });
      setSelectedRoom(null);
    } catch (error) {
      console.error('Error submitting reservation:', error.response ? error.response.data : error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error submitting your reservation. Please try again.',
      });
    }
  };

  const imgStyles = {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  };

  const textCenterStyles = {
    textAlign: 'center'
  };

  return (
    <section className="site-section">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 className="mb-5">Reservation Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-6 form-group">
                  <label htmlFor="arrivalDate">Arrival Date</label>
                  <input type="date" className="form-control" id="arrivalDate" value={formData.arrivalDate} onChange={handleInputChange} />
                </div>

                <div className="col-sm-6 form-group">
                  <label htmlFor="departureDate">Departure Date</label>
                  <input type="date" className="form-control" id="departureDate" value={formData.departureDate} onChange={handleInputChange} />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-group">
                  <label htmlFor="room">Room</label>
                  <select id="room" className="form-control" onChange={handleRoomChange} value={formData.room}>
                    <option value="">Select a room</option>
                    {rooms.map((room) => (
                      <option key={room._id} value={room._id}>
                        {room.number}-{room.type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" className="form-control" value={formData.email} onChange={handleInputChange} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 form-group">
                  <label htmlFor="message">Write a Note</label>
                  <textarea id="message" className="form-control" cols="30" rows="8" value={formData.message} onChange={handleInputChange}></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group">
                  <input type="submit" value="Reserve Now" className="btn btn-primary" />
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <h3 className="mb-5">Selected Room Information</h3>
            {selectedRoom ? (
              <div className="media d-block room mb-0">
                <figure style={{ width: '100%' }}>
                  <img src={`http://localhost:5001/uploads/${selectedRoom.image}`} alt={selectedRoom.type} className="img-fluid" style={imgStyles} />
                  <div className="overlap-text">
                    <span>
                      Featured Room 
                      <span className="ion-ios-star"></span>
                      <span className="ion-ios-star"></span>
                      <span className="ion-ios-star"></span>
                    </span>
                  </div>
                </figure>
                <div className="media-body" style={textCenterStyles}>
                  <h3 className="mt-0"><a>{selectedRoom.type || 'Room Type'}</a></h3>
                  <ul className="room-specs ml-4">
                    <li>{selectedRoom.status}</li>
                  </ul>
                  <p>{selectedRoom.accommodation || 'No description available.'}</p>
                  <p><a href="#" className="btn btn-primary btn-sm">Price ${selectedRoom.price}</a></p>
                </div>
              </div>
            ) : (
              <p>Please select a room to see its details.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationForm;

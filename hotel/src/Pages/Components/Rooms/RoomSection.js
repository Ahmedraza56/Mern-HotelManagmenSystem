import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const RoomSection = () => {
  const [rooms, setRooms] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with actual authentication check
  const navigate = useNavigate();

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

  const handleBooking = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'You need to be logged in to access this page!',
      });
    }
  };

  const imgStyles = {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  };

  const figureStyles = {
    width: '100%'
  };

  const textCenterStyles = {
    textAlign: 'center'
  };

  return (
    <section className="site-section">
      <div className="container">
        <div className="row">
          {rooms.map((room) => (
            <div className="col-md-4 mb-4" key={room._id}>
              <div className="media d-block room mb-0">
                <figure style={figureStyles}>
                  <img src={`http://localhost:5001/uploads/${room.image}`} alt={room.type} style={imgStyles} />
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
                  <h3 className="mt-0"><a>{room.type || 'Room Type'}</a></h3>
                  <ul className="room-specs">
                  <p>{room.status || 'N/A'}</p>
                  </ul>
                  <p>{room.accommodation || 'No description available.'}</p>
                  <p><button onClick={() => handleBooking('/BookNow')} className="btn btn-primary btn-sm">Book Now From ${room.price || 'N/A'}</button></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomSection;


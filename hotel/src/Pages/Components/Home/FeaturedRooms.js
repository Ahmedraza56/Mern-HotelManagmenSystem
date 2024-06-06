import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const FeaturedRooms = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with actual authentication check
  const navigate = useNavigate();

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

  return (
    <section className="site-section bg-light">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-12 heading-wrap text-center">
            <h4 className="sub-heading">Our Luxury Rooms</h4>
            <h2 className="heading">Featured Rooms</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            <div className="media d-block room mb-0">
              <figure>
                <img src="images/img_1.jpg" alt="Presidential Room" className="img-fluid" />
                <div className="overlap-text">
                  <span>
                    Featured Room
                    <span className="ion-ios-star"></span>
                    <span className="ion-ios-star"></span>
                    <span className="ion-ios-star"></span>
                  </span>
                </div>
              </figure>
              <div className="media-body">
                <h3 className="mt-0"><Link to="#" onClick={() => handleBooking('/BookNow')}>Presidential Suite</Link></h3>
                <ul className="room-specs">
                  <li><span className="ion-ios-people-outline"></span> 2 Guests</li>
                  <li><span className="ion-ios-crop"></span> 22 ft<sup>2</sup></li>
                </ul>
                <p>Experience unparalleled luxury and elegance in our Presidential Suite, offering stunning views and exceptional amenities.</p>
                <p><button onClick={() => handleBooking('/Rooms')} className="btn btn-primary btn-sm">Book Now From $250</button></p>
              </div>
            </div>
          </div>
          <div className="col-md-5 room-thumbnail-absolute">
            <div className="media d-block room bg first-room" style={{ backgroundImage: "url(images/img_2.jpg)" }} onClick={() => handleBooking('/Rooms')}>
              <div className="overlap-text">
                <span>
                  Deluxe Room
                  <span className="ion-ios-star"></span>
                  <span className="ion-ios-star"></span>
                  <span className="ion-ios-star"></span>
                </span>
                <span className="pricing-from">
                  from $180
                </span>
              </div>
            </div>
            <div className="media d-block room bg second-room" style={{ backgroundImage: "url(images/img_4.jpg)" }} onClick={() => handleBooking('/Rooms')}>
              <div className="overlap-text">
                <span>
                  Standard Room
                  <span className="ion-ios-star"></span>
                  <span className="ion-ios-star"></span>
                  <span className="ion-ios-star"></span>
                </span>
                <span className="pricing-from">
                  from $120
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;

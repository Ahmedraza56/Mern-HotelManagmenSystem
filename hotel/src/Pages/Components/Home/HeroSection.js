// src/components/HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    // <section className="site-hero overlay" data-stellar-background-ratio="0.5" style={{ backgroundImage: "url(images/big_image_1.jpg)" }}>
    //   <div className="container">
    //     <div className="row align-items-center site-hero-inner justify-content-center">
    //       <div className="col-md-12 text-center">
    //         <div className="mb-5 element-animate fadeInUp element-animated">
    //           <h1>Welcome To Our Luxury Rooms</h1>
    //           <p>Discover our world's #1 Luxury Room For VIP.</p>
    //           <p><Link to="/booknow" className="btn btn-primary">Book Now</Link></p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="site-hero site-hero-innerpage overlay" data-stellar-background-ratio="0.5" style={{backgroundImage: 'url("images/big_image_1.jpg")', backgroundPosition: '-25px -25px'}}>
    <div className="container">
      <div className="row align-items-center site-hero-inner justify-content-center">
        <div className="col-md-12 text-center">

          <div className="mb-5 element-animate fadeInUp element-animated">
            <h1>LUXURY HOTEL</h1>
            <p>Discover our world's #1 Luxury Room For VIP.</p>
          </div>

        </div>
      </div>
    </div>
  </section>
  );
};

export default HeroSection;


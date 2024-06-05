import React from 'react';
//import bigImage1 from '../../../../public/images/big_image_1.jpg'; // Adjust the path as necessary

const HeroSection = () => {
  return (
    <section 
      className="site-hero site-hero-innerpage overlay" 
      data-stellar-background-ratio="0.5" 
      style={{ backgroundImage: "url(/images/big_image_1.jpg)" }}
    >
      <div className="container">
        <div className="row align-items-center site-hero-inner justify-content-center">
          <div className="col-md-12 text-center">
            <div className="mb-5 element-animate fadeInUp element-animated">
              <h1>Our Rooms</h1>
              <p>Discover our world's #1 Luxury Room For VIP.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

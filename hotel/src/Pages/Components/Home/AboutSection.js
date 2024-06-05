// src/components/AboutSection.js
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section className="site-section">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-4">
          <div className="heading-wrap element-animate fadeInUp element-animated">
            <h4 className="sub-heading">Experience Luxury and Comfort</h4>
            <h2 className="heading">Our Story</h2>
            <p>Founded in 2010, our hotel has been a sanctuary of luxury and comfort for travelers from around the world. Our mission is to provide unparalleled hospitality and make every guest feel at home.</p>
            <p>Over the years, we have continually upgraded our facilities and services to meet the evolving needs of our guests. Our dedicated team is committed to ensuring that each stay is memorable, offering personalized services and attention to detail.</p>
          </div>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-7">
          <img src="images/f_img_1.png" alt="Our Story" className="img-md-fluid" />
        </div>
      </div>
    </div>
  </section>
  );
};

export default AboutSection;

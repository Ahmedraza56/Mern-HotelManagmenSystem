import React from 'react';

const OurStaffSection = () => {
  return (
    <section className="site-section bg-light">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-12 heading-wrap text-center">
            <h4 className="sub-heading">Our Kind Staff</h4>
            <h2 className="heading">Our Staff</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="post-entry">
              <img src="images/person_4.jpg" alt="Michelle Aguilar" className="img-fluid" />
              <div className="body-text">
                <div className="category">Staff</div>
                <h3 className="mb-3"><a href="#">Michelle Aguilar</a></h3>
                <p className="mb-4">Michelle is our friendly front desk manager who ensures all our guests have a pleasant stay. With over 10 years of experience in the hospitality industry, she is dedicated to providing exceptional customer service.</p>
                <p><a href="#" className="btn btn-primary btn-outline-primary btn-sm">Read Bio</a></p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="post-entry">
              <img src="images/person_2.jpg" alt="Chris Standworth" className="img-fluid" />
              <div className="body-text">
                <div className="category">Staff</div>
                <h3 className="mb-3"><a href="#">Chris Standworth</a></h3>
                <p className="mb-4">Chris is our operations manager who oversees the day-to-day activities at the hotel. He brings a wealth of knowledge and expertise, ensuring everything runs smoothly and efficiently.</p>
                <p><a href="#" className="btn btn-primary btn-outline-primary btn-sm">Read Bio</a></p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="post-entry">
              <img src="images/person_3.jpg" alt="Rob McDonald" className="img-fluid" />
              <div className="body-text">
                <div className="category">Cook</div>
                <h3 className="mb-3"><a href="#">Rob McDonald</a></h3>
                <p className="mb-4">Rob is our talented head chef who creates delicious meals for our guests. With a passion for culinary arts, he has crafted a menu that features both local and international dishes.</p>
                <p><a href="#" className="btn btn-primary btn-outline-primary btn-sm">Read Bio</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStaffSection;

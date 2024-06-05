import React from 'react';

const RelaxSection = () => {
  return (
    <section
      className="section-cover"
      data-stellar-background-ratio="0.5"
      style={{ backgroundImage: 'url(/images/img_5.jpg)' }}
    >
      <div className="container">
        <div className="row justify-content-center align-items-center intro">
          <div className="col-md-9 text-center element-animate fadeInUp element-animated">
            <h2>Relax and Enjoy Your Holiday</h2>
            <p className="lead mb-5">
              Escape to our tranquil retreat and unwind in serene surroundings. Our luxurious amenities and personalized services ensure your holiday is both relaxing and rejuvenating.
            </p>
            <div className="btn-play-wrap">
              <a
                href="https://vimeo.com/channels/staffpicks/93951774"
                className="btn-play popup-vimeo"
              >
                <span className="ion-ios-play"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelaxSection;

import React from 'react';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-4">
            <h3>Phone Support</h3>
            <p>Available 24/7. Call us anytime.</p>
            <p className="lead"><a href="tel://+13323093323">+1 332 3093 323</a></p>
          </div>
          <div className="col-md-4">
            <h3>Connect With Us</h3>
            <p>Follow us on social media for the latest updates.</p>
            <a href="/contact" className="btn btn-primary">Contact Us</a>

          </div>
          <div className="col-md-4">
            <h3>Newsletter</h3>
            <p>Subscribe to our newsletter for exclusive offers and updates.</p>
            <form action="#" className="subscribe">
              <div className="form-group">
                <button type="submit"><span className="ion-ios-arrow-thin-right"></span></button>
                <input type="email" className="form-control" placeholder="Enter email" />
              </div>
            </form>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-7 text-center">
            &copy; {new Date().getFullYear()} All rights reserved. This website is created by Aptech Students.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

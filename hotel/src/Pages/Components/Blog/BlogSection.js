import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const BlogSection = () => {
  return (
    <section className="site-section bg-light">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-4">
            <div className="post-entry">
              <a href="blog-single.html"><img src="images/img_3.jpg" alt="New Rooms" className="img-fluid" /></a>
              <div className="body-text">
                <div className="category">Rooms</div>
                <h3 className="mb-3"><a href="blog-single.html">New Rooms Available</a></h3>
                <p className="mb-4">Explore our newly renovated rooms that combine modern amenities with classic elegance. Perfect for a comfortable and luxurious stay.</p>
                <p><NavLink className="btn btn-primary btn-outline-primary btn-sm" to="/blogsingle">Read More</NavLink></p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="post-entry">
              <a href="blog-single.html"><img src="images/img_6.jpg" alt="New Staff" className="img-fluid" /></a>
              <div className="body-text">
                <div className="category">News</div>
                <h3 className="mb-3"><a href="blog-single.html">Meet Our New Staff</a></h3>
                <p className="mb-4">We are excited to welcome our new team members who bring a wealth of experience and enthusiasm. Get to know them and their roles in enhancing your stay.</p>
                <p><NavLink className="btn btn-primary btn-outline-primary btn-sm" to="/blogsingle">Read More</NavLink></p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="post-entry">
              <a href="blog-single.html"><img src="images/img_5.jpg" alt="Big Rooms" className="img-fluid" /></a>
              <div className="body-text">
                <div className="category">Rooms</div>
                <h3 className="mb-3"><a href="blog-single.html">Spacious Rooms for Families</a></h3>
                <p className="mb-4">Our large family rooms provide ample space for everyone. Enjoy your vacation with the comfort and convenience of home in our well-appointed accommodations.</p>
                <p><NavLink className="btn btn-primary btn-outline-primary btn-sm" to="/blogsingle">Read More</NavLink></p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default BlogSection;

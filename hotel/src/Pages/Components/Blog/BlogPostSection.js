import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const BlogPostSection = () => {
  // Set default rating to 1
  const [rating, setRating] = useState(1);
  const [feedbacks, setFeedbacks] = useState([]);

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.feedbackEmail.value; // Ensure unique name
    const message = e.target.message.value;

    // Log data to ensure all fields are populated
    console.log('Submitting feedback with data:', { name, email, rating, message });

    const feedbackData = {
      name,
      email,
      rating,
      message,
    };

    fetch('http://localhost:5001/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Feedback submitted:', data);
        Swal.fire('Thank you!', 'Your feedback has been submitted.', 'success');
        // Update feedbacks state to include the new feedback
        setFeedbacks([data, ...feedbacks]);
      })
      .catch((error) => {
        console.error('Error submitting feedback:', error);
        Swal.fire('Error', 'There was an issue submitting your feedback.', 'error');
      });
  };

  useEffect(() => {
    fetch('http://localhost:5001/api/feedback')
      .then((response) => response.json())
      .then((data) => setFeedbacks(data))
      .catch((error) => console.error('Error fetching feedback:', error));
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="star">&#9733;</span>); // Filled star
      } else {
        stars.push(<span key={i} className="star">&#9734;</span>); // Empty star
      }
    }
    return stars;
  };

  return (
    <section className="site-section py-lg">
      <div className="container">
        <div className="row blog-entries">
          <div className="col-md-12 col-lg-8 main-content">
            <h1 className="mb-4">A New Trend in Men's Fashion: Socks and Sandals</h1>
            <div className="post-meta">
              <span className="category">Fashion</span>
              <span className="mr-2">June 1, 2024</span> &bullet;
              <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
            </div>
            <div className="post-content-body">
              <p>The combination of socks and sandals has been historically frowned upon in the fashion world. However, recent trends have shown that this once mocked pairing is now gaining popularity among fashion-forward men.</p>
              <p>From high-end runways to street fashion, socks and sandals have become a statement of comfort and style. Fashion designers are embracing this trend by creating socks and sandals that are not only comfortable but also aesthetically pleasing.</p>
              <p>Some people may still be skeptical about this trend, but those who have tried it often praise the combination for its unique look and feel. The key to pulling off this style is to choose the right pair of socks and sandals that complement each other and your overall outfit.</p>
              <p>Ultimately, fashion is about expressing oneself, and the resurgence of socks and sandals in men's fashion is a testament to the ever-evolving nature of style. Whether you love it or hate it, this trend is here to stay, at least for now.</p>
            </div>

            <div className="pt-5">
              <p>Categories: <a href="#">Fashion</a>, <a href="#">Trends</a> Tags: <a href="#">#socksandsandals</a>, <a href="#">#mensfashion</a></p>
            </div>

            <div className="pt-5">
              <h3 className="mb-5">Feedback</h3>
              <ul className="comment-list">
                {feedbacks.map((feedback) => (
                  <li className="comment" key={feedback._id}>
                    <div className="vcard">
                      <img src="images/person_1.jpg" alt="Image placeholder" />
                    </div>
                    <div className="comment-body">
                      <h3>{feedback.name}</h3>
                      <div className="meta">{new Date(feedback.createdAt).toLocaleString()}</div>
                      <p>{feedback.message}</p>
                      <div>{renderStars(feedback.rating)}</div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="comment-form-wrap pt-5">
                <h3 className="mb-5">Leave a Feedback</h3>
                <form onSubmit={handleSubmit} className="p-5 bg-light">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input type="text" className="form-control" id="name" name="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="feedbackEmail">Email *</label>
                    <input type="email" className="form-control" id="feedbackEmail" name="feedbackEmail" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="rating">Rating *</label>
                    <select id="rating" name="rating" className="form-control" value={rating} onChange={handleRatingChange} required>
                      <option value="1">1 Star</option>
                      <option value="2">2 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="5">5 Stars</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" cols="30" rows="10" className="form-control" required></textarea>
                  </div>
                  <div className="form-group">
                    <input type="submit" value="Send" className="btn btn-primary" />
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-12 col-lg-4 sidebar">
            <div className="sidebar-box search-form-wrap">
              <form action="#" className="search-form">
                <div className="form-group">
                  <span className="icon fa fa-search"></span>
                  <input type="text" className="form-control" id="s" placeholder="Search..." />
                </div>
              </form>
            </div>

            <div className="sidebar-box">
              <h3 className="heading">Popular Posts</h3>
              <div className="post-entry-sidebar">
                <ul>
                  <li>
                    <a href="">
                      <img src="images/img_1.jpg" alt="Image placeholder" className="mr-4" />
                      <div className="text">
                        <h4>The Best Men's Fashion Trends of 2024</h4>
                        <div className="post-meta">
                          <span className="mr-2">May 20, 2024</span> &bullet;
                          <span className="ml-2"><span className="fa fa-comments"></span> 5</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <img src="images/img_2.jpg" alt="Image placeholder" className="mr-4" />
                      <div className="text">
                        <h4>How to Style Your Socks with Sandals</h4>
                        <div className="post-meta">
                          <span className="mr-2">May 15, 2024</span> &bullet;
                          <span className="ml-2"><span className="fa fa-comments"></span> 2</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <img src="images/img_3.jpg" alt="Image placeholder" className="mr-4" />
                      <div className="text">
                        <h4>Top 10 Fashion Accessories for Men</h4>
                        <div className="post-meta">
                          <span className="mr-2">April 30, 2024</span> &bullet;
                          <span className="ml-2"><span className="fa fa-comments"></span> 8</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="sidebar-box">
              <h3 className="heading">Categories</h3>
              <ul className="categories">
                <li><a href="#">Fashion <span>(12)</span></a></li>
                <li><a href="#">Trends <span>(22)</span></a></li>
                <li><a href="#">Lifestyle <span>(37)</span></a></li>
                <li><a href="#">Travel <span>(42)</span></a></li>
                <li><a href="#">Health <span>(14)</span></a></li>
              </ul>
            </div>

            <div className="sidebar-box">
              <h3 className="heading">Tags</h3>
              <ul className="tags">
                <li><a href="#">Fashion</a></li>
                <li><a href="#">Trends</a></li>
                <li><a href="#">Lifestyle</a></li>
                <li><a href="#">Travel</a></li>
                <li><a href="#">Health</a></li>
                <li><a href="#">Accessories</a></li>
                <li><a href="#">Style</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPostSection;

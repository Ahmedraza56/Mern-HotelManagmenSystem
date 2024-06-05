import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire('Thank you!', 'Your message has been sent.', 'success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: ''
        });
      })
      .catch((error) => {
        console.error('Error submitting contact form:', error);
        Swal.fire('Error', 'There was an issue submitting your message.', 'error');
      });
  };

  return (
    <section className="site-section">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 className="mb-5">Contact Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12 form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 form-group">
                  <label htmlFor="message">Write Message</label>
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    cols="30"
                    rows="8"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group">
                  <input
                    type="submit"
                    value="Send Message"
                    className="btn btn-primary"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <h3 className="mb-5">Get in Touch</h3>
            <p className="mb-5">
              <img src="images/img_4.jpg" alt="Contact Us" className="img-fluid" />
            </p>
            <p>
              We are here to assist you with any questions or concerns you may have. Our dedicated team is committed to providing exceptional service and support. Please feel free to reach out to us through the contact form, or you can call or email us directly.
            </p>
            <p>
              Whether you need more information about our services, have a special request, or simply want to provide feedback, we would love to hear from you. Your satisfaction is our top priority, and we look forward to connecting with you soon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

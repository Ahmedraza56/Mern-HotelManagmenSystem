import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Swal from 'sweetalert2';

const AddRoom = () => {
  const [formData, setFormData] = useState({
    number: '',
    type: '',
    accommodation: '',
    price: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    axios.post('http://localhost:5001/api/addroom', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Room added successfully',
        });
        setFormData({
          number: '',
          type: '',
          accommodation: '',
          price: '',
          image: null
        });
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to add room',
        });
      });
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>DASHMIN - Hotel Management System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="img/favicon.ico" rel="icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />
        <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
        <link href="lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet" />
        <link href="css/bootstrap.min.css" rel="stylesheet" />
        <link href="css/style.css" rel="stylesheet" />
      </Helmet>
      <div className="container-xxl position-relative bg-white d-flex p-0">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-12">
                <div className="bg-light rounded h-100 p-4">
                  <h3 className="mb-4">Add Room</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingNumber"
                        placeholder="Room Number"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="floatingNumber">Room Number</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingType"
                        placeholder="Room Type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="floatingType">Room Type</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingAccommodation"
                        placeholder="Accommodation"
                        name="accommodation"
                        value={formData.accommodation}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="floatingAccommodation">Accommodation</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingPrice"
                        placeholder="Price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="floatingPrice">Price</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="file"
                        className="form-control"
                        id="floatingImage"
                        placeholder="Image"
                        name="image"
                        onChange={handleImageChange}
                      />
                      <label htmlFor="floatingImage">Image</label>
                    </div>
                    <button type="submit" className="btn btn-primary py-3 w-100 mb-4">Add Room</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
        <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
      </div>
    </>
  );
};

export default AddRoom;

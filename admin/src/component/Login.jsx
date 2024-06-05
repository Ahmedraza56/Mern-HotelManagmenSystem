import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';

const AdminLogin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData);
     axios.post('http://localhost:5001/api/admin/login', formData)
    
      .then(response => {
        const userRole = response.data.role;
        if (userRole === 1) {
          console.log('Login successful:', response);
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You have logged in successfully.',
          })
       
            navigate('/reservedroom');
            const token = response.data.token;
            localStorage.setItem('token', token);      
        
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'This user is not allowed to login.',
          });
        }
      })
      .catch(error => {
        console.error('Login failed:', error);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid email or password.',
        });
      });

  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin Login - Hotel Management System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="img/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />
        <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
        <link href="lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet" />
        <link href="css/bootstrap.min.css" rel="stylesheet" />
        <link href="css/style.css" rel="stylesheet" />
      </Helmet>
      <div className="container-xxl position-relative bg-white d-flex p-0">
        <div className="container-fluid">
          <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
              <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h3 className="text-primary"><i className="fa fa-hashtag me-2"></i>HMS</h3>
                  <h3>Signin</h3>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      autoComplete="current-password"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <button type="submit" className="btn btn-primary py-3 w-100 mb-4">Sign In</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
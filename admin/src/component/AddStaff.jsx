import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Swal from 'sweetalert2';

const AddStaff = () => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    age: '',
    salary: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5001/api/addstaff', formData)
      .then(response => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Staff added successfully',
        });
        setFormData({
          name: '',
          designation: '',
          age: '',
          salary: ''
        });
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to add staff',
        });
      });
  };

  return (
    <>
      <div className="container-xxl position-relative bg-white d-flex p-0">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="container-fluid pt-4 px-4">
            <div className="bg-light rounded h-100 p-4">
              <h3 className="mb-4">Add Staff</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingName"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="floatingName">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingDesignation"
                    placeholder="Designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="floatingDesignation">Designation</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingAge"
                    placeholder="Age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="floatingAge">Age</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingSalary"
                    placeholder="Salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="floatingSalary">Salary</label>
                </div>
                <button type="submit" className="btn btn-primary py-3 w-100 mb-4">Add Staff</button>
              </form>
            </div>
          </div>
          <Footer />
        </div>
        <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
      </div>
    </>
  );
};

export default AddStaff;

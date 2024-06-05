import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const ManageStaff = () => {
  const [staff, setStaff] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    age: '',
    salary: ''
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/staff');
      setStaff(response.data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (staff) => {
    setEditingStaff(staff._id);
    setFormData({
      name: staff.name,
      designation: staff.designation,
      age: staff.age,
      salary: staff.salary
    });
  };

  const handleDelete = async (staffId) => {
    try {
      await axios.delete(`http://localhost:5001/api/staff/${staffId}`);
      fetchStaff();
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/staff/${editingStaff}`, formData);
      setEditingStaff(null);
      setFormData({
        name: '',
        designation: '',
        age: '',
        salary: ''
      });
      fetchStaff();
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  };

  return (
    <>
      <div className="container-xxl position-relative bg-white d-flex p-0">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="container-fluid pt-4 px-4">
            <div className="bg-light rounded h-100 p-4">
              <h3 className="mb-4">Manage Staff</h3>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Designation</th>
                      <th scope="col">Age</th>
                      <th scope="col">Salary</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map((staff, index) => (
                      <tr key={staff._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{staff.name}</td>
                        <td>{staff.designation}</td>
                        <td>{staff.age}</td>
                        <td>{staff.salary}</td>
                        <td>
                          <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(staff)}>
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(staff._id)}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {editingStaff && (
                <div className="mt-4">
                  <h3>Edit Staff</h3>
                  <form onSubmit={handleUpdate}>
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
                    <button type="submit" className="btn btn-primary py-3 w-100 mb-4">Update Staff</button>
                  </form>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </div>
        <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
          <i className="bi bi-arrow-up"></i>
        </a>
      </div>
    </>
  );
};

export default ManageStaff;

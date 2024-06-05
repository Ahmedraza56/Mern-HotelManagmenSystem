import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/'); // Navigate to the login page
  };

  return (
    <div className="sidebar pe-4 pb-3">
      <nav className="navbar bg-light navbar-light">
        <a href="/reservedroom" className="navbar-brand mx-4 mb-3">
          <h3 className="text-primary"><i className="fa fa-hashtag me-2"></i>HMS</h3>
        </a>
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <img className="rounded-circle" src="img/user.jpg" alt="" style={{ width: "40px", height: "40px" }} />
            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
          </div>
          <div className="ms-3">
            <h6 className="mb-0">Jhon Doe</h6>
            <span>Admin</span>
          </div>
        </div>
        <div className="navbar-nav w-100">
          <a href="/reservedroom" className="nav-item nav-link active">
            <i className="fa fa-tachometer-alt me-2"></i>Dashboard
          </a>
          <div className="nav-item dropdown">
            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              <i className="fa fa-door-open me-2"></i>Rooms
            </a>
            <div className="dropdown-menu bg-transparent border-0">
              <a href="/addroom" className="dropdown-item">Add Room</a>
              <a href="/manageroom" className="dropdown-item">Manage Room</a>
            </div>
          </div>
          <div className="nav-item dropdown">
            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              <i className="fa fa-user me-2"></i>Staff
            </a>
            <div className="dropdown-menu bg-transparent border-0">
              <a href="/addstaff" className="dropdown-item">Add Staff</a>
              <a href="/managestaff" className="dropdown-item">Manage Staff</a>
            </div>
          </div>
          <div className="nav-item nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <i className="fa fa-sign-out-alt me-2"></i>Logout
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;

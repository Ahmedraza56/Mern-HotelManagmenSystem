import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoginSignupModal from './LoginSignupModal';

const Navbar = () => {
  const [modalShow, setModalShow] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setModalShow(false);
  };

  const isTokenAvailable = () => {
    const token = localStorage.getItem('token');
    return !!token; 
  };

  const handleBookNowClick = (e) => {
    if (!isTokenAvailable()) {
      e.preventDefault();
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'You need to login first!',
      }).then(() => {
        navigate('/');
      });
    }
  };

  const buttonStyle = {
    background: 'none',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.5)',
    padding: 0,
    cursor: 'pointer',
    fontSize: 'inherit',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    textDecoration: 'none',
    marginTop: '26px',
    marginLeft: '7px',
    marginRight: '5px',
  };

  const handleMouseOver = (e) => {
    e.target.style.color = '#0056b3';
  };

  const handleMouseOut = (e) => {
    e.target.style.textDecoration = 'none';
    e.target.style.color = 'rgba(255, 255, 255, 0.5)';
  };

  return (
    <header role="banner">
      <nav className="navbar navbar-expand-md navbar-dark bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Luxury Hotel</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse navbar-light" id="navbarsExample05">
            <ul className="navbar-nav ml-auto pl-lg-5 pl-0">
              <li className="nav-item">
                <NavLink exact="true" className="nav-link" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/rooms">Rooms</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/blog">Blog</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">Contact</NavLink>
              </li>
              {isAuthenticated ? (
                <li className="nav-item">
                  <button
                    className="nav-link"
                    style={buttonStyle}
                    onClick={handleLogout}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <button
                    className="nav-link"
                    style={buttonStyle}
                    onClick={() => setModalShow(true)}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    Login
                  </button>
                </li>
              )}
              <li className="nav-item cta">
                <NavLink className="nav-link" to="/booknow" onClick={handleBookNowClick}><span>Book Now</span></NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <LoginSignupModal show={modalShow} onHide={() => setModalShow(false)} onLogin={handleLogin} />
    </header>
  );
};

export default Navbar;

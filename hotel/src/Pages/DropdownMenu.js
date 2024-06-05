import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className={`nav-item dropdown ${isOpen ? 'show' : ''}`} onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
      <NavLink
        className="nav-link dropdown-toggle"
        to="/rooms"
        id="dropdown04"
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={(e) => e.preventDefault()}
      >
        Rooms
      </NavLink>
      <div className={`dropdown-menu ${isOpen ? 'show' : ''}`} aria-labelledby="dropdown04">
        <NavLink className="dropdown-item" to="/rooms/videos">Room Videos</NavLink>
        <NavLink className="dropdown-item" to="/rooms/presidential">Presidential Room</NavLink>
        <NavLink className="dropdown-item" to="/rooms/luxury">Luxury Room</NavLink>
        <NavLink className="dropdown-item" to="/rooms/deluxe">Deluxe Room</NavLink>
      </div>
    </li>
  );
};

export default DropdownMenu;

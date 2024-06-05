import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate  } from 'react-router-dom';
import Login from './component/Login';
import AddRoom from './component/AddRoom';
import ManageRoom from './component/ManageRoom';
import AddStaff from './component/AddStaff';
import ManageStaff from './component/ManageStaff';
import ReservedRooms from './component/Reservedroom';

const isTokenAvailable = () => {
  const token = localStorage.getItem('token');
  return !!token; 
};

const App = () => {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
        path="/addroom"
        element={isTokenAvailable() ? <AddRoom/> : <Navigate to="/" />}
      />
        <Route
        path="/manageroom"
        element={isTokenAvailable() ? <ManageRoom/> : <Navigate to="/" />}
      />
        <Route
        path="/addstaff"
        element={isTokenAvailable() ? <AddStaff/> : <Navigate to="/" />}
      />
        <Route
        path="/managestaff"
        element={isTokenAvailable() ? <ManageStaff/> : <Navigate to="/" />}
      />
      <Route
        path="/reservedroom"
        element={isTokenAvailable() ? <ReservedRooms/> : <Navigate to="/" />}
      />
      </Routes>
    </Router>
  );
};

export default App;
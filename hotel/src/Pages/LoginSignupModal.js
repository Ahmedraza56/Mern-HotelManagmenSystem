import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSignupModal = ({ show, onHide, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      onLogin();
    }
  }, [onLogin]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    console.log('API Base URL:', apiBaseUrl);  // Debugging line

    if (!apiBaseUrl) {
      console.error('API base URL is not defined');
      setMessage('Server configuration error');
      return;
    }

    const url = isLogin ? `${apiBaseUrl}/api/login` : `${apiBaseUrl}/api/register`;
    const data = { email: formData.email, password: formData.password };

    try {
      const response = await axios.post(url, data, { withCredentials: true });
      console.log('Response:', response); // Log the response
      setMessage(response.data.message);
      if (response.status === 200 && isLogin) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        onLogin();
      } else if (response.status === 201 && !isLogin) {
        setIsLogin(true);
        setMessage('Signup successful. Please log in.');
      }
    } catch (error) {
      console.error('Error response:', error.response); // Log the error response
      setMessage(error.response ? error.response.data.message : 'Server Error');
    }
  };

  const modalStyles = {
    display: show ? 'block' : 'none',
    position: 'fixed',
    zIndex: 1050,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: '60px 0',
  };

  const modalContentStyles = {
    backgroundColor: '#fff',
    margin: '5% auto',
    padding: '20px',
    border: '1px solid #888',
    width: '80%',
    maxWidth: '500px',
    borderRadius: '10px',
  };

  const closeButtonStyles = {
    color: '#aaa',
    float: 'right',
    fontSize: '28px',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const buttonStyles = {
    padding: '10px 20px',
    borderRadius: '2px',
    marginBottom: '10px',
    cursor: 'pointer',
    border: 'none',
    color: '#fff',
    outline: 'none',
  };

  const primaryButtonStyles = {
    ...buttonStyles,
    backgroundColor: '#b99365',
  };

  const outlineButtonStyles = {
    ...buttonStyles,
    backgroundColor: 'transparent',
    color: '#b99365',
    border: '2px solid #b99365',
  };

  const formGroupStyles = {
    marginBottom: '15px',
  };

  const formLabelStyles = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  };

  const formControlStyles = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '2px',
    border: '1px solid #ccc', // Corrected from `ccc` to `#ccc`
  };

  const toggleButtonContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  };

  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <span style={closeButtonStyles} onClick={onHide}>&times;</span>
        <div style={toggleButtonContainerStyles}>
          <button
            style={isLogin ? primaryButtonStyles : outlineButtonStyles}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            style={!isLogin ? primaryButtonStyles : outlineButtonStyles}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" style={{ display: 'none' }} />
          <div style={formGroupStyles}>
            <label style={formLabelStyles} htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              style={formControlStyles}
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="email"
            />
          </div>
          <div style={formGroupStyles}>
            <label style={formLabelStyles} htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              style={formControlStyles}
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="new-password"
            />
          </div>
          {!isLogin && (
            <div style={formGroupStyles}>
              <label style={formLabelStyles} htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                style={formControlStyles}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                autoComplete="new-password"
              />
            </div>
          )}
          {message && <p>{message}</p>}
          <button type="submit" style={primaryButtonStyles}>
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSignupModal;

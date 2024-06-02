import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import MainPage from './MainPage';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:8000/accounts/user', {
         // const response = await axios.get('http://localhost:3000/users' 
        params: {
          arrfields: ['id', 'fname', 'lname', 'position', 'eid', 'department', 'email', 'password', 'domain']
        }
      });

      const users = response.data;
      const user = users.find(user => user.email === formData.email);

      if (!user) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Incorrect email.',
          customClass: {
            popup: 'small-popup'
          }
        });
        return;
      }

      if (user.password !== formData.password) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Incorrect password.',
          customClass: {
            popup: 'small-popup'
          }
        });
        return;
      }

      localStorage.setItem('is_authenticated', 'true');
      setIsLoggedIn(true);
      Swal.fire({
        icon: 'success',
        title: 'Successfully logged in!',
        timer: 1000,
        showConfirmButton: false,
        customClass: {
          popup: 'small-popup'
        }
      });

    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while logging in. Please try again later.',
        customClass: {
          popup: 'small-popup'
        }
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <MainPage />
      ) : (
        <>
          <div className="left-side">
            <img src={'../../icon/coca cola.png'} alt="Coca-Cola Logo" className="logo" />
            <p>Beverages</p>
            <p>Philippines, Inc.</p>
          </div>
          <div className="right-side">
            <div className="login-form">
              <h2>Welcome back!</h2>
              <img src={'../../icon/bottle2.png'} alt="Coca-Cola Logo" className="botlogo" />
              <form onSubmit={handleSubmit} autoComplete="off">
                <label className="form-label">Email<span className="text-danger">*</span></label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                />

                <label className="form-label">Password<span className="text-danger">*</span></label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleInputChange}
                />

                <div className="Button">
                  <button type="submit" className="btn">Login Now</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;

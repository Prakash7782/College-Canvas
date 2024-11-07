import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
// import { GoogleLogin } from '@react-oauth/google';
import "../styles/Login.css";
import Navbar from '../component/Navbar.js'

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('Email and password are required');
    }
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message);
        localStorage.setItem('token', result.jwtToken);
        localStorage.setItem('loggedInUser', result.name);
        setTimeout(() => navigate('/'), 1000);
      } else {
        handleError(result.error || result.message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  // const handleGoogleLoginSuccess = async (credentialResponse) => {
  //   const token = credentialResponse.credential;
  //   if (token) {
  //     try {
  //       const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/google-login`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ token }),
  //       });
  //       const result = await response.json();
  //       if (result.success) {
  //         handleSuccess('Google Login Successful');
  //         localStorage.setItem('token', result.jwtToken);
  //         localStorage.setItem('loggedInUser', result.name);
  //         setTimeout(() => navigate('/home'), 1000);
  //       } else {
  //         handleError('Failed to login with Google');
  //       }
  //     } catch (error) {
  //       handleError('Error verifying Google login token');
  //     }
  //   } else {
  //     handleError('Failed to retrieve Google login token');
  //   }
  // };

  // const handleGoogleLoginFailure = () => {
  //   handleError('Google Login Failed');
  // };
  return (
    <>
      <div style={{zindex:"1"}}><Navbar /></div>
      <div className='login-body'>
        <div className='login-container'>
          <h1><b>Welcome back</b></h1>
          <form className='login-form' onSubmit={handleLogin}>
            <div>
              <label htmlFor='email'><b>Email</b></label>
              <input
                onChange={handleChange}
                type='email'
                name='email'
                placeholder='Enter your email...'
                value={loginInfo.email}
                style={{ textAlign: 'left' }} 
              />
            </div>
            <div>
              <label htmlFor='password'><b>Password</b></label>
              <input
                onChange={handleChange}
                type='password'
                name='password'
                placeholder='Enter your password...'
                value={loginInfo.password}
                style={{ textAlign: 'left' }} 
              />
            </div>
            <button className='login-button' type='submit'>Login</button>
            <span><b className='signup-nav'>Don't have an account?</b>
              <Link to="/signup"><i className='signup-btn'> Signup</i></Link>
            </span>
          </form>

          {/* <div>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
        />
      </div> */}

          <ToastContainer />
        </div>
      </div>
    </>
  );
}

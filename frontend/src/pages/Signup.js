import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
// import { GoogleLogin } from '@react-oauth/google';
import Navbar from '../component/Navbar.js'

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = signupInfo;

        if (!name || !email || !password || !confirmPassword) {
            return handleError('All fields are required');
        }
        if (password.length < 4) {
            return handleError('Password should not be less than 4 characters');
        }
    

        if (password !== confirmPassword) {
            return handleError('Passwords do not match');
        }

        try {
            const url = `${process.env.REACT_APP_API_URL}/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const result = await response.json();
            if (result.success) {
                handleSuccess(result.message);
                setTimeout(() => navigate('/login'), 1000);
            } else {
                handleError(result.error || result.message);
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    // const handleGoogleSignupSuccess = async (credentialResponse) => {
    //     const token = credentialResponse.credential;
    //     if (token) {
    //         try {
    //             const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/google-signup`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({ token }),
    //             });
    //             const result = await response.json();
    //             if (result.success) {
    //                 handleSuccess('Google Signup Successful');
    //                 localStorage.setItem('token', result.jwtToken);
    //                 localStorage.setItem('loggedInUser', result.name);
    //                 setTimeout(() => navigate('/home'), 1000);
    //             } else {
    //                 handleError('Failed to signup with Google');
    //             }
    //         } catch (error) {
    //             handleError('Error verifying Google signup token');
    //         }
    //     } else {
    //         handleError('Failed to retrieve Google signup token');
    //     }
    // };

    // const handleGoogleSignupFailure = () => {
    //     handleError('Google Signup Failed');
    // };

    return (
        <>
            <Navbar />
            <div className='login-body'>
                <div className='login-container'>
                    <h1><b>Signup</b></h1>
                    <form className='login-form' onSubmit={handleSignup}>
                        <div>
                            <label htmlFor='name'>Name</label>
                            <input
                                onChange={handleChange}
                                type='text'
                                name='name'
                                placeholder='Enter your name...'
                                value={signupInfo.name}
                                style={{ textAlign: 'left' }} 
                            />
                        </div>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input
                                onChange={handleChange}
                                type='email'
                                name='email'
                                placeholder='Enter your email...'
                                value={signupInfo.email}
                                style={{ textAlign: 'left' }} 
                            />
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input
                                onChange={handleChange}
                                type='password'
                                name='password'
                                placeholder='Enter your password...'
                                value={signupInfo.password}
                                style={{ textAlign: 'left' }} 
                            />
                        </div>
                        <div>
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <input
                                onChange={handleChange}
                                type='password'
                                name='confirmPassword'
                                placeholder='Confirm your password...'
                                value={signupInfo.confirmPassword}
                                style={{ textAlign: 'left' }} 
                            />
                        </div>
                        <button className='login-button' type='submit'>Signup</button>
                        <span className='signup-nav'>Already have an account?
                            <Link to="/login"><i className='signup-btn'>Login</i> </Link>
                        </span>
                    </form>

                    {/* <div>
                <GoogleLogin
                    onSuccess={handleGoogleSignupSuccess}
                    onError={handleGoogleSignupFailure}
                />
            </div> */}

                    <ToastContainer />
                </div>
            </div>
        </>
    );
}

export default Signup;

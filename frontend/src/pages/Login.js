import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { GoogleLogin } from '@react-oauth/google';

function Login() {
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
                setTimeout(() => navigate('/home'), 1000);
            } else {
                handleError(result.error || result.message);
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;
        if (token) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/google-login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });
                const result = await response.json();
                if (result.success) {
                    handleSuccess('Google Login Successful');
                    localStorage.setItem('token', result.jwtToken);
                    localStorage.setItem('loggedInUser', result.name);
                    setTimeout(() => navigate('/home'), 1000);
                } else {
                    handleError('Failed to login with Google');
                }
            } catch (error) {
                handleError('Error verifying Google login token');
            }
        } else {
            handleError('Failed to retrieve Google login token');
        }
    };

    const handleGoogleLoginFailure = () => {
        handleError('Google Login Failed');
    };

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                    />
                </div>
                <button type='submit'>Login</button>
                <span>Don't have an account? 
                    <Link to="/signup">Signup</Link>
                </span>
            </form>

            <div>
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginFailure}
                />
            </div>

            <ToastContainer />
        </div>
    );
}

export default Login;

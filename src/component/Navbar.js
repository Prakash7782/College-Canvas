import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
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
        localStorage.removeItem('loggedInUser');
        setIsAuthenticated(false);
        navigate('/login');
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fw-bold fst-italic" to="/home">
                    <img src={require('../assets/VisionOva (2).png')} alt="VisionOva Logo" style={{ height: '40px', width: '180px' , objectFit:'cover'}} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/my-design">My designs</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/create-designs">Create designs</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/view-templates">view templates</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            {isAuthenticated ? (
                                <li className="nav-item">
                                    <button className="nav-link active btn btn-link" onClick={handleLogout}>Logout</button>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/login">Login</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav >
        </div >
    );
}

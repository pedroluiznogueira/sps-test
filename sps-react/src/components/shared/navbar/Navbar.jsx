import React from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {

    const handleLogout = () => {
        window.sessionStorage.clear();
    }

    return(
        <nav className="navbar">
            <div className="logo-block">
                <span className="logo">SPS Consultoria</span>
            </div>
            <div className="logout-block">
                <NavLink onClick={handleLogout} className="logout" to='/login' style={{ textDecoration: 'none' }}>
                    Sair
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;
import "../componentsStyles/nav.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from '../context/AuthContext';
import { toast } from 'sonner';

function Nav() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    toast('You Have Been Logged Out. See You Soon!');
    setDropdownOpen(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="menu">
      <ul>
        <li>
          <Link className="link" to="/">
            <img
              alt="logo"
              className="header__icon"
              src={require("../images/logo.png")}
            />
          </Link>
        </li>
        <li>
          <Link className="link" to="/">
            <h2 className="navLink">HOME</h2>
          </Link>
        </li>
        <li>
          <Link className="link" to="/movies/popular">
            <h2 className="navLink">POPULAR</h2>
          </Link>
        </li>
        <li>
          <Link className="link" to="/movies/top_rated">
            <h2 className="navLink">TOP RATED</h2>
          </Link>
        </li>
        <li>
          <Link className="link" to="/movies/upcoming">
            <h2 className="navLink">UPCOMING</h2>
          </Link>
        </li>
        <li className="nav-item" ref={dropdownRef}>
          {isLoggedIn ? (
            <>
              <div className="dropdown-trigger" onClick={toggleDropdown}>
                <h2 className="navLink">
                  MY ACCOUNT {dropdownOpen ? '▲' : '▼'}
                </h2>
              </div>
              {dropdownOpen && (
                <div className="dropdown-content">
                  <Link className="dropdown-item" to="/favorites">
                    MY WATCHLIST
                  </Link>
                 
                  <div className="dropdown-item" onClick={handleLogout}>
                    LOGOUT
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link className="link" to="/auth">
              <h2 className="navLink">LOGIN</h2>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Nav;

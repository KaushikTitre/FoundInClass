import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthStatus } from './context';
import { logout } from '../api/auth';

function Navbar() {
  const [sticky, setSticky] = useState(false);
   
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthStatus);

  const navigate = useNavigate();
  async function handleClick() {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      try {
        await logout();                 
        localStorage.removeItem("token"); 
        setIsAuthenticated(false);      
        navigate("/login");
        alert("Logged out successfully!");
      } catch (err) {
        console.error("Logout failed", err);
      }
    }
  }
   
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`flex justify-between items-center px-8 py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          sticky 
            ? "bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200" 
            : "bg-white"
        }`}
      >
        {/* Logo / Project Name */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            FoundInClass
          </span>
        </div>

        {/* Nav Links */}
        <ul className="flex space-x-10 text-gray-600 font-medium">
          <li className="relative group">
            <Link 
              to='/' 
              className="hover:text-blue-600 transition-colors duration-300 py-2 inline-block"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li className="relative group">
            <Link 
              to='/About' 
              className="hover:text-blue-600 transition-colors duration-300 py-2 inline-block"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li className="relative group">
            <Link 
              to='/dashboard' 
              className="hover:text-blue-600 transition-colors duration-300 py-2 inline-block"
            >
              Dashboard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
        </ul>

        {/* Login/Logout Button */}
        <button  
          onClick={handleClick} 
          className="relative ml-6 px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden group"
        >
          <span className="relative z-10 flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Login</span>
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </button>
      </nav>
    </>
  );
}

export default Navbar;
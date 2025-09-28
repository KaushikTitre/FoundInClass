import React, { useState, useEffect ,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthStatus } from './context';
import {logout } from '../api/auth';

function Navbar() {
  const [sticky, setSticky] = useState(false);
   
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthStatus);

  const navigate = useNavigate();
  async function handleClick() {
   if(!isAuthenticated){
    navigate("/login");
   }
   else{
    try {
      await logout();
      alert("Logged out");
      setIsAuthenticated(false);  // <- update context
      navigate("/login");         // optional redirect
    } catch(err) {
      console.error("Logout failed", err);
    }
   }
    setTimeout(() => {
    }, 5);
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
    className={`flex justify-between items-center px-8 py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
      sticky ? "bg-gray-100 shadow-lg" : "bg-white"
    }`}
  
    >
      {/* Logo / Project Name */}
      <div className="text-2xl font-bold text-blue-600">FoundInClass</div>

      {/* Nav Links */}
      <ul className="flex space-x-8 text-gray-700 font-medium">
        <li className="hover:text-blue-600 cursor-pointer">
         <Link to='/'>Home</Link>
           </li>
        <li className="hover:text-blue-600 cursor-pointer"> <Link to='/About'>About</Link>
        </li>
      </ul>

      {/* Login Button */}
      <button  onClick={handleClick} className="ml-6 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all">
      {isAuthenticated ? "Logout" : "Login"}
      </button>
    </nav>
    </>
  );
}

export default Navbar;

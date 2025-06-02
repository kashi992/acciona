import React from "react";
import "./navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
const location = useLocation();
  const navigate = useNavigate();
    // Check if user is logged in (based on token)
  const isLoggedIn = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("lastActiveTime");
    navigate("/login");
  };

  return (
    <header className={`bg-white ${location.pathname === "/dashboard" ? 'hidden' : ''}`}>
      <div className="container flex md:justify-between justify-center items-center md:flex-nowrap flex-wrap md:gap-0 gap-3">
        <div className="headerLogos h-full">
        <img src="https://cpb-uglsolution-videos.s3.us-east-1.amazonaws.com/acciona/mainLogo.png" alt="" className="h-full w-full object-contain"/>
        </div>
        {/* Show Logout button if logged in */}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className={`bg-[#294245] logBTn text-white leading-none shadow-md hover:bg-red-700 absolute xl:right-5 right-2 my-auto ${location.pathname !== '/login' ? 'block' : 'hidden'}`}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;

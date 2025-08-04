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
      <div className="container">
        <div className="h-fit">
        <img src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/northway_logo.png" alt="" className="min-[1370px]:h-full min-[1200px]:h-[50px] h-[35px]"/>
        </div>
        <h2 className={`text-[#074d44] ${location.pathname === "/home" ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>Northland Corridor PPP</h2>
        <div className={`${location.pathname === "/login" ? 'col-span-2 min-[1370px]:h-[72px] h-[60px] ml-auto' : 'col-span-1 h-fit'}`}>
        <img src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/mainLogo.png" alt="" className="h-full"/>
        </div>
        {/* Show Logout button if logged in */}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className={`bg-[#294245] logBTn text-white leading-none shadow-md hover:bg-red-700  my-auto ${location.pathname !== '/login' ? 'block' : 'hidden'}`}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;

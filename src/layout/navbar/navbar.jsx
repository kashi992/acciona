import React from "react";
import "./navbar.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
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
        <Link to="/home" className="min-[1680px]:h-[78px] min-[1370px]:h-[72px] min-[991px]:h-[50px] h-[35px]">
          <img src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/northway_logo.png" alt="" className="h-full" />
        </Link>
        <h2 className={`text-[#074d44] ${location.pathname === "/home" ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>Northland Corridor Programme Section 1 <br />
          Ara Tūhono (Warkworth to Te Hana) <br />
          Public Private Partnership</h2>
        {/* <div className={`min-[1680px]:h-[72px] min-[1370px]:h-[63px] min-[991px]:h-[50px] h-[45px] ${location.pathname === "/login" ? 'col-span-2 ml-auto' : 'col-span-1'}`}>
        <img src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/acciona/mainLogo.png" alt="" className="h-full"/>
        </div> */}
        {/* Show Logout button if logged in */}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className={`logBTn leading-none shadow-md my-auto ${location.pathname !== '/login' ? 'block' : 'hidden'}`}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;

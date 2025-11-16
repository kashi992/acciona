import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom'
import './index.css'
import DashboardIcon from '../../assets/images/DashboardIcon.jsx'
import HomeIcon from '../../assets/images/HomeIcon.jsx'
import { useLocation, useNavigate } from "react-router-dom";
import UsersIcon from "../../assets/images/UsersIcon.jsx";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell
} from 'recharts';
import Hamburger from "../../assets/images/Hamburger.jsx";
import ChartLine from "../../assets/images/ChartLine.jsx";
import CrossIcon from "../../assets/images/CrossIcon.jsx";



const Dashboard = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [visitorLogs, setVisitorLogs] = useState([]);
  const [error, setError] = useState(null); // Error state for handling fetch errors
  const [stats, setStats] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [allClickStats, setAllClickStats] = useState([]);
  const [mostClickedVideo, setMostClickedVideo] = useState(null);
  const [watchStats, setWatchStats] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const navigate = useNavigate();
  const location = useLocation();
  // Check if user is logged in (based on token)
  const isLoggedIn = localStorage.getItem("authToken");
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("lastActiveTime");
    navigate("/login");
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    fetch("https://yhqeotl54j.execute-api.us-east-1.amazonaws.com/prod/getVisitors")
      .then(res => res.json())
      .then(data => {
        setVisitorCount(data.count);
        setVisitorLogs(data.logs);
      })
      .catch(err => {
        console.error("getVisitors error", err);
        setError("Failed to load visitor logs.");
      });
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://b1bnn3xtc3.execute-api.us-east-1.amazonaws.com/prod/get-first-click-stats");
        const data = await res.json();
        const sorted = data.sort((a, b) => b.count - a.count);
        setStats(sorted);
      } catch (err) {
        console.error("Error loading stats", err);
        setError("Failed to load first click stats.");
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getBarColor = (videoId, index, maxCount) => {
    const colorPalette = [
      "#4B9DFE", "#62C2A2", "#FFA573", "#ED5A9E", "#6A5ACD", "#00CED1", "#FF69B4"
    ];

    if (index === 0) return "#FF4C4C"; // 🔴 highest clicked video in red
    return colorPalette[index % colorPalette.length];
  };

  useEffect(() => {
    const fetchAllClicks = async () => {
      try {
        const res = await fetch("https://b1bnn3xtc3.execute-api.us-east-1.amazonaws.com/prod/allClicks");
        const data = await res.json();
        setAllClickStats(data);
        // Aggregate total clicks per videoId
        const videoClickMap = {};
        data.forEach(({ videoId, count }) => {
          if (!videoClickMap[videoId]) {
            videoClickMap[videoId] = 0;
          }
          videoClickMap[videoId] += count;
        });

        // Identify Top Performing Video (By Clicks)
        if (data.length > 0) {
          const topVideo = data.reduce((max, video) =>
            video.totalClicks > max.totalClicks ? video : max,
            data[0]
          );
          setMostClickedVideo(topVideo);
        }
      } catch (err) {
        console.error("Error loading all click stats", err);
      }
    };

    fetchAllClicks();
  }, []);

  useEffect(() => {
    const fetchWatchStats = async () => {
      try {
        const res = await fetch("https://b2vbbt4864.execute-api.us-east-1.amazonaws.com/prod/getWatchStats");
        const data = await res.json();
        setWatchStats(data);
      } catch (err) {
        console.error("Error loading watch stats", err);
      }
    };

    fetchWatchStats();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false); // 👈 Close sidebar if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="dashboardWrap flex w-full">
      <div className={`backDrop ${isSidebarOpen ? 'block' : 'hidden'}`}></div>
      <nav aria-label="Sidebar"
        ref={sidebarRef}
        className={`h-full fixed menuSidebar bg-white z-[2] shadow-md ${isSidebarOpen ? "open" : ""}`}>
        <CrossIcon onClick={() => setIsSidebarOpen(false)} className={`w-[30px] h-[30px] cursor-pointer absolute right-[10px] top-[10px]`} iconClr="#294245" />
        <div className="bg-white dark:bg-transparent rounded-none">
          <h2 className="px-6 py-4 flex items-center sidebarlogo font-bold h-[72px]" style={{paddingLeft: "24px"}}>Northway</h2>
          <div className="h-[calc(100vh_-_0px)] simplebar-scrollable-y">
            <nav
              className="mt-6 sidebar-nav list-none px-5 flex flex-col gap-4">
              <li>
                <Link className="flex bg-[#635BFF] gap-3 items-center shadow-lg rounded-xl px-4 py-3 text-white">
                  <DashboardIcon className="w-[18px] h-[18px]" iconClr="#fff" />  Dashboard
                </Link>
              </li>
              <li onClick={handleLogout}>
                <Link className="flex gap-3 items-center px-4 py-3">
                  <HomeIcon className="w-[18px] h-[18px]" iconClr="#000" />  Home
                </Link>
              </li>
            </nav>
          </div>
        </div>
      </nav>
      <div className="page-wrapper-sub flex flex-col w-full">
        <header className={`sticky top-0 z-[1] bg-white ${isScrolled ? 'border-b' : ''}`}>
          <nav className="dark:border-gray-700 rounded-none bg-transparent dark:bg-transparent py-3 md:px-8 px-4 flex justify-between items-center h-[72px]">
            <Hamburger onClick={toggleSidebar} iconClr="#294245" className="w-[20px] h-[20px] cursor-pointer" />
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className={`bg-[#294245] text-white cursor-pointer border-[#294245] border-[1px] hover:bg-transparent hover:text-[#294245] py-4 md:px-8 px-4 leading-none rounded-[30px] shadow-md ${location.pathname !== '/login' ? 'block' : 'hidden'}`}
              >
                Logout
              </button>
            )}
          </nav>
        </header>
        <div className="h-full rounded-[20px] bg-[#F4F7FB] md:px-8 px-4 md:pt-8 pt-6 pb-[65px]" style={{ borderTopRightRadius: '0px' }}>
          <div className="w-full">
            <div className='grid gap-6 dashboardInner'>
              <div className="bg-white rounded-xl shadow-md md:py-6 py-4 md:px-8 px-4 w-full xl:block flex md:gap-6 gap-3 flex-wrap items-center">
                <div className="flex items-center md:gap-4 gap-3">
                  <div className="bg-[#16CDC740] text-secondary md:p-3 p-2 rounded-md">
                    <UsersIcon className="w-[24px] h-[24px]" iconClr="#16CDC7" />
                  </div>
                  <h4 className="sf xl:xl:text-[26px] md:text-[22px] text-[16px] font-semibold">Total Unique Visitors</h4>
                </div>
                <h1 className="sf xl:text-[50px] md:text-[36px] text-[26px] md:w-fit w-full font-bold text-center">{visitorCount}</h1>
              </div>
              <div className="bg-white rounded-xl shadow-md md:py-6 py-4 md:px-8 px-4 w-full">
                <div className="flex items-center md:gap-4 gap-3">
                  <div className="bg-[#16CDC740] text-secondary md:p-3 p-2 rounded-md">
                    <ChartLine className="w-[24px] h-[24px]" iconClr="#16CDC7" />
                  </div>
                  <h4 className="sf xl:text-[26px] md:text-[22px] text-[16px] font-semibold">Top Performing Video (By Clicks): {mostClickedVideo?.videoId || "N/A"}
                  </h4>
                </div>
                <h1 className="sf xl:text-[50px] md:text-[36px] text-[26px] xl:mt-0 mt-3 font-bold text-center flex xl:justify-center items-center gap-3 md:justify-start justify-center"> <span className="text-[70%]">Total Clicks:</span>   {mostClickedVideo?.totalClicks || 0}</h1>
              </div>
              <div className="bg-white rounded-xl shadow-md md:px-6 px-4 md:py-6 py-4">
                <h2 className="sf xl:text-[26px] md:text-[22px] text-[16px] font-bold mb-6">First Interaction Per Video</h2>
                {/* Display error message if fetch failed */}
                {error && <p className="text-red-500">{error}</p>}
                <div className="h-[400px] overflow-auto w-full">
                  <table className="w-full overflow-auto">
                    <thead className="sticky top-0">
                      <tr>
                        <th className="font-medium md:p-4 p-2 text-start bg-gray-200 md:text-[16px] text-[14px]">Video Name</th>
                        <th className="font-medium md:p-4 p-2 text-start bg-gray-200 md:text-[16px] text-[14px]">Click Count</th>
                        <th className="font-medium md:p-4 p-2 text-start bg-gray-200 md:text-[16px] text-[14px]">IP Address</th>
                        {/* <th className="font-medium md:p-4 p-2 text-start bg-gray-200 md:text-[16px] text-[14px]">Timestamp</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(stats) && stats.length > 0 &&
                        stats.flatMap(({ videoId, clicks }) =>
                          clicks.map((click, index) => (
                            <tr key={`${videoId}-${index}`}>
                              <td className="border-b border-gray-300 md:p-4 p-2 font-medium md:text-[16px] text-[14px]">{videoId}</td>
                              <td className="border-b border-gray-300 md:p-4 p-2 font-medium md:text-[16px] text-[14px]">1</td>
                              <td className="border-b border-gray-300 md:p-4 p-2 font-medium md:text-[16px] text-[14px]">{click.ip}</td>
                              {/* <td className="border-b border-gray-300 md:p-4 p-2 font-medium md:text-[16px] text-[14px]">
                                  {new Date(click.timestamp).toLocaleString()}
                                </td> */}
                            </tr>
                          ))
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md md:px-6 px-4 md:py-6 py-4">
                <h2 className="sf xl:text-[26px] md:text-[22px] text-[16px] font-bold mb-6">First Click Distribution</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={stats}

                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="videoId" angle={-45} textAnchor="end" interval={0} height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="count"
                      barSize={40} // 🔹 narrower bars
                      fill="#8884d8"
                    >
                      {
                        stats.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={getBarColor(entry.videoId, index, stats[0].count)}
                          />
                        ))
                      }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-xl shadow-md md:px-6 px-4 md:py-6 py-4">
                <h2 className="sf xl:text-[26px] md:text-[22px] text-[16px] font-bold mb-6">Cumulative Video Click Counts</h2>
                {/* Display error message if fetch failed */}
                {error && <p className="text-red-500">{error}</p>}
                <div className="h-[400px] overflow-auto w-full">
                  <table className="w-full overflow-auto">
                    <thead className="sticky top-0">
                      <tr>
                        <th className="font-medium md:p-4 p-2 text-start bg-gray-200 md:text-[16px] text-[14px]">Video Name</th>
                        <th className="font-medium md:p-4 p-2 text-start bg-gray-200 md:text-[16px] text-[14px]">Total Clicks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(allClickStats) && allClickStats.map((row, i) => (
                        <tr key={i}>
                          <td className="border-b border-gray-300 md:p-4 p-2 font-medium md:text-[16px] text-[14px]">{row.videoId}</td>
                          <td className="border-b border-gray-300 md:p-4 p-2 font-medium md:text-[16px] text-[14px]">{row.totalClicks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md md:px-6 px-4 md:py-6 py-4 w-full" >
                <h2 className="sf xl:text-[26px] md:text-[22px] text-[16px] font-bold mb-6">Total Clicks by Video</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={allClickStats}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="videoId" angle={-45} textAnchor="end" interval={0} height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="totalClicks"
                      barSize={40} // 🔹 narrower bars
                      fill="#8884d8"
                    >
                      {
                        stats.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={getBarColor(entry.videoId, index, stats[0].count)}
                          />
                        ))
                      }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-xl shadow-md md:px-6 px-4 md:py-6 py-4 xl:col-span-2">
                <h2 className="sf xl:text-[26px] md:text-[22px] text-[16px] font-bold mb-6">Top Watched Videos (By Average Watch Time)</h2>
                {watchStats.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={watchStats}

                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="videoId" angle={-45} textAnchor="end" interval={0} height={100} />
                      <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Bar dataKey="avgWatchPercent" barSize={40}>
                        {watchStats.map((entry, index) => (
                          <Cell
                            key={`bar-${index}`}
                            fill={index === 0 ? "#FF4C4C" : "#8884d8"} // 🔴 Red bar for top watched
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-gray-500">No watch data available yet.</p>
                )}
              </div>
            </div>
            <p className="fixed w-full bg-white py-3 text-[14px] leading-none md:px-8 px-4 shadow-xl border-t bottom-0 text-end right-0">
              Powered by LUCID EDGE
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Dashboard

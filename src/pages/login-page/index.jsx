import React, { useState, useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [activeTab, setActiveTab] = useState("user");
  const [error, setError] = useState("");
  const [capVal, setCapVal] = useState(null);
  const navigate = useNavigate();

  // Credentials
  const correctAdminUsername = "Northway";
  const correctAdminPassword = "lucid3DG3";
  const correctUsername = "Northway";
  const correctPassword = "W2THNorthway";

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      activeTab === "user" &&
      credentials.username === correctUsername &&
      credentials.password === correctPassword
    ) {
      setError("");
      localStorage.setItem("authToken", "userToken");
      localStorage.setItem("lastActiveTime", new Date().getTime());

      fetch("https://ipinfo.io/json?token=0451d8a1ae05e5")
        .then(res => res.json())
        .then(data => {
          const visitorData = {
            ip: data.ip,
            city: data.city,
            region: data.region,
            country: data.country,
            time: new Date().toISOString()
          };

          fetch("https://yhqeotl54j.execute-api.us-east-1.amazonaws.com/prod/trackVisitor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(visitorData),
          })
            .then(res => res.json())
            .then(console.log) // Optional: log response
            .catch(err => console.error("trackVisitor error", err));
        });
      navigate("/home");
    } else if (
      activeTab === "admin" &&
      credentials.username === correctAdminUsername &&
      credentials.password === correctAdminPassword
    ) {
      setError("");
      localStorage.setItem("authToken", "adminToken");
      localStorage.setItem("lastActiveTime", new Date().getTime());
      navigate("/dashboard");
    } else {
      setError("Invalid username or password!");
    }
  };

  const updateLastActiveTime = () => {
    if (localStorage.getItem("authToken")) {
      localStorage.setItem("lastActiveTime", new Date().getTime());
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", updateLastActiveTime);
    document.addEventListener("keydown", updateLastActiveTime);

    return () => {
      document.removeEventListener("mousemove", updateLastActiveTime);
      document.removeEventListener("keydown", updateLastActiveTime);
    };
  }, []);

  useEffect(() => {
    // Clear input fields when LoginForm mounts
    setCredentials({ username: "", password: "" });
    setError("");
  }, []);

//   useEffect(() => {
//   // Auto-validate captcha on localhost
//   if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
//     setCapVal(true);
//   }
// }, []);



  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        {/* <h2 className="font-bold">User Login</h2> */}
        <div className="tabButtons grid grid-cols-2 mb-4">
          <button
            type="button"  // ✅ prevents form submit on Enter
            className={`tabItem ${activeTab === "user" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("user");
              setCredentials({ username: "", password: "" }); // Clear input fields
              setError("");
            }}
          >
            User
          </button>
          <button
            type="button"  // ✅ prevents form submit on Enter
            className={`tabItem ${activeTab === "admin" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("admin");
              setCredentials({ username: "", password: "" }); // Clear input fields
              setError("");
            }}
          >
            Admin
          </button>
        </div>
        <h2 className="mb-5 mt-3">
          {activeTab === "admin" ? "Admin Login" : "User Login1"}
        </h2>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          required
        />
        
        <ReCAPTCHA className="mb-[15px]"
          sitekey="6LfGDhMsAAAAAIxboTBqNandn9KjI2fmwPtHl03T"
          onChange={(value) => setCapVal(value)}
        />
        <button className={`${capVal ? "" : "opacity-80"}`} type="submit" disabled={!capVal} style={capVal ? {cursor: "pointer"} : {cursor: "not-allowed"}}>Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
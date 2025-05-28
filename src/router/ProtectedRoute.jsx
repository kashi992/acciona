import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const expiryDuration = 30 * 60 * 1000; // 30 minutes
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const lastActive = localStorage.getItem("lastActiveTime");

        // Check session validity
        const sessionValid = token && lastActive && (Date.now() - parseInt(lastActive) <= expiryDuration);

        if (sessionValid) {
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem("authToken");
            localStorage.removeItem("lastActiveTime");
        }

        setCheckingAuth(false); // We’re done checking
    }, []);

    useEffect(() => {
        if (!isAuthenticated) return;

        const updateLastActiveTime = () => {
            localStorage.setItem("lastActiveTime", Date.now().toString());
        };

        const events = ["mousemove", "mousedown", "click", "scroll", "keypress", "touchstart"];
        events.forEach(e => window.addEventListener(e, updateLastActiveTime));
        updateLastActiveTime();

        const interval = setInterval(() => {
            const lastActive = localStorage.getItem("lastActiveTime");
            if (!lastActive || Date.now() - parseInt(lastActive) > expiryDuration) {
                localStorage.removeItem("authToken");
                localStorage.removeItem("lastActiveTime");
                window.location.href = "/login";
            }
        }, 1000);

        return () => {
            clearInterval(interval);
            events.forEach(e => window.removeEventListener(e, updateLastActiveTime));
        };
    }, [isAuthenticated]);

    if (checkingAuth) return null; // Prevent flash

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location.pathname, message: "Please login first" }}
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;

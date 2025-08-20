import React, { useEffect, useState } from "react";
import { Outlet,useNavigate } from "react-router-dom";
import { Header, Footer } from "./index";
import { useDispatch } from "react-redux";
import { login } from "./Store/authSlice";
import Loader from "./Components/Loader"; // Adjust the path based on your project structure

function Layout() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuthOnLoad = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      console.log("No token or userId found in localStorage");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("User data fetched:", userData);
        dispatch(login(userData));
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch user data:", errorData);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    checkAuthOnLoad();

    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <main className="flex-grow container mx-auto">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default Layout;
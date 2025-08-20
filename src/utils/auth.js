import { login } from "../Store/authSlice";

export const checkAuthOnLoad = async (dispatch) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const userData = localStorage.getItem("userData");

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
      localStorage.setItem("userData", JSON.stringify(userData)); // Update localStorage
    } else {
      const errorData = await response.json();
      console.error("Failed to fetch user data:", errorData);
      if (userData) {
        console.log("Falling back to stored user data");
        dispatch(login(JSON.parse(userData))); // Use stored userData
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    if (userData) {
      console.log("Falling back to stored user data");
      dispatch(login(JSON.parse(userData))); // Use stored userData
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    }
  }
};
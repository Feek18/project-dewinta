import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// logout
export const handleLogout = async (
  setEmail,
  setIsLogin,
  setName,
  navigate,
  addToast
) => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");

    setIsLogin(false);
    setEmail(null);
    setName(null);

    toast.success("Logout successful!", {
      position: "top-right",
      autoClose: 3000,
    });

    // Navigasi ke home tanpa reload
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 2000);
  } catch (error) {
    console.error("Logout failed:", error);

    toast.error("Logout Failed!", {
      position: "top-right",
      autoClose: 3000,
    });
  }
};

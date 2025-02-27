import axios from "axios";

// logout
export const handleLogout = async (
  setEmail,
  setIsLogin,
  setName,
  navigate,
  addToast
) => {
  try {
    const token = sessionStorage.getItem("token");

    if (token) {
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("name");

    setIsLogin(false);
    setEmail(null);
    setName(null);

    addToast({
      title: "Logout Berhasil",
      description: "Anda telah berhasil logout.",
      color: "success",
    });

    // Navigasi ke home tanpa reload
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 2000);
  } catch (error) {
    console.error("Logout failed:", error);

    addToast({
      title: "Logout Gagal!",
      description: "Terjadi kesalahan saat logout.",
      color: "danger",
    });
  }
};

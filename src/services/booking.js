import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getBooking = (callback) => {
  const token = localStorage.getItem("token");

  // Jika tidak ada token, cukup hentikan fungsi tanpa error
  if (!token) {
    return; // Tidak menampilkan error, hanya menghentikan eksekusi
  }

  axios
    .get("http://localhost:8000/api/booking-salon", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (callback) callback(res.data.data); // Pastikan callback hanya dipanggil jika tersedia
    })
    .catch((err) => {
      console.error("Error fetching bookings:", err);

      if (err.response) {
        console.error("Error Response:", err.response.data);
        toast.error("Failed to fetch booking data!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    });
};

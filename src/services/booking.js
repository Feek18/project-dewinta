import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getBooking = (callback) => {
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:8000/api/booking-salon", {
      headers: {
        Authorization: `Bearer ${token}`, // Kirim token dalam header
      },
    })
    .then((res) => {
      callback(res.data.data);
      //   console.log(res.data.data);
    })
    .catch((err) => {
      console.log(err);
      if (err.response) {
        console.log("Error Response:", err.response.data);
        toast.dismiss();
        toast.error("Failed to fetch booking data!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
      }
    });
};

import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const handlePayment = (orderId) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://localhost:8000/api/continue/payment`, // Ensure this API returns a Snap Token
        { order_id: orderId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data.snapToken) {
          // Open Midtrans Snap payment popup
          window.snap.pay(res.data.snapToken, {
            onSuccess: function (result) {
              console.log("Payment successful:", result);
              toast.success("Payment successful!", {
                position: "top-right",
                autoClose: 3000,
              });
            },
            onPending: function (result) {
              console.log("Payment pending:", result);
              toast.warning("Payment is pending!", {
                position: "top-right",
                autoClose: 3000,
              });
            },
            onError: function (result) {
              console.log("Payment error:", result);
              toast.error("Payment failed!", {
                position: "top-right",
                autoClose: 3000,
              });
            },
            onClose: function () {
              console.log("Payment popup closed");
              toast.info("Payment process canceled.", {
                position: "top-right",
                autoClose: 3000,
              });
            },
          });
        } else {
          const formattedAmount = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(res.data.gross_amount);
   
          console.log(res.data)
          toast.success(`${res.data.bank}: ${res.data.va_number}, Total: ${formattedAmount}`, {
            position: "top-right",
            autoClose: 60000,
          });          
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
        toast.error("Failed to initiate payment!", {
            position: "top-right",
            autoClose: 3000,
          });
      });
  };

export {
    handlePayment,
}
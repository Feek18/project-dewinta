import React from "react";

const PaymentModal = ({ show, handleClose, paymentData }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold">Payment Details</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-red-500">
            ✖
          </button>
        </div>

        <div className="mt-4">
          {paymentData ? (
            <div>
              <p><strong>Bank:</strong> {paymentData.bank || "N/A"}</p>
              <p><strong>Amount:</strong> {paymentData.gross_amount || "N/A"}</p>
              <p><strong>Payment Type:</strong> {paymentData.payment_type?.toUpperCase() || "N/A"}</p>
              <p><strong>Transaction Status:</strong> {paymentData.transaction_status || "N/A"}</p>
              <p><strong>VA Number:</strong> <span className="text-blue-600 font-semibold">{paymentData.va_number || "N/A"}</span></p>
            </div>
          ) : (
            <p className="text-red-500">Failed to retrieve payment data!</p>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;

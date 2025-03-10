import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { handlePayment } from "../../services/payment";

// Define column mappings for DataTable
const columns = [
  {
    name: "NAMA",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "EMAIL",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "TELP",
    selector: (row) => row.telp,
    sortable: true,
  },
  {
    name: "ALAMAT",
    selector: (row) => row.alamat,
    sortable: true,
  },
  {
    name: "LAYANAN",
    selector: (row) => row.id_layanan,
    sortable: true,
  },
  {
    name: "DATE",
    selector: (row) => row.date,
    sortable: true,
  },
  {
    name: "STATUS",
    selector: (row) => row.status,
    sortable: true,
    cell: (row) => (
      <span
        className={`px-3 py-1 text-white text-sm rounded-md ${
          row.status === "active"
            ? "bg-green-500"
            : row.status === "paused"
            ? "bg-red-500"
            : "bg-yellow-500"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    name: "PAYMENTS",
    selector: (row) => row.order_id,
    cell: (row) => (
      <button
        className="bg-blue-500 text-white px-4 py-1 rounded-full"
        onClick={() => handlePayment(row.order_id)}
      >
        Take a Payment
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

const TableCol = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Refresh payment API
        await axios.get("http://localhost:8000/api/refresh/payment", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Fetch booking data
        const response = await axios.get(
          "http://localhost:8000/api/booking-salon",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setBookings(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter data based on search term
  const filteredData = bookings.filter((booking) =>
    Object.values(booking).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="flex justify-center p-4 bg-white shadow-md rounded-md">
      <div className="w-full max-w-6xl">
        {/* Search Input */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Booking List</h2>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-md w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* DataTable */}
        <div className="w-full overflow-auto">
          <DataTable
            columns={columns}
            data={filteredData}
            progressPending={loading}
            pagination
            highlightOnHover
            responsive
            noDataComponent="No results found"
          />
        </div>
      </div>
    </div>
  );
};

export default TableCol;

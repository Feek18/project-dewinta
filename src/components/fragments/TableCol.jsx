import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
} from "@heroui/react";
import axios from "axios";

const columns = [
  { name: "NAMA", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "TELP", uid: "telp" },
  { name: "ALAMAT", uid: "alamat" },
  { name: "LAYANAN", uid: "layanan" },
  { name: "DATE", uid: "date" },
  { name: "STATUS", uid: "status" },
  { name: "PAYMENTS", uid: "payments" },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const TableCol = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/booking-salon",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBookings(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBookings();
  }, []);

  const renderCell = (booking, columnKey) => {
    switch (columnKey) {
      case "name":
      case "email":
      case "telp":
      case "alamat":
      case "date":
        return (
          <p className="text-sm font-semibold capitalize">
            {booking[columnKey]}
          </p>
        );
      case "layanan":
        return (
          <p className="text-sm font-semibold capitalize">
            {booking.layanan_salon?.name || "-"}
          </p>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[booking.status] || "default"}
            size="sm"
            variant="flat"
          >
            {booking.status}
          </Chip>
        );
      case "payments":
        return (
          <div className="flex justify-center items-center gap-2">
            <button className="text-md text-white bg-blue-500 px-4 py-1 rounded-full">
              Take a Payment
            </button>
          </div>
        );
      default:
        return booking[columnKey];
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table className="w-[1150px] rounded-lg shadow">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
            className="text-center"
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={bookings}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell className="text-center" key={columnKey}>
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableCol;

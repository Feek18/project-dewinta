import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const Schedule = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const months = [
    { value: 1, label: "Januari" },
    { value: 2, label: "Februari" },
    { value: 3, label: "Maret" },
    { value: 4, label: "April" },
    { value: 5, label: "Mei" },
    { value: 6, label: "Juni" },
    { value: 7, label: "Juli" },
    { value: 8, label: "Agustus" },
    { value: 9, label: "September" },
    { value: 10, label: "Oktober" },
    { value: 11, label: "November" },
    { value: 12, label: "Desember" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/schedule")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.error("Gagal mengambil data schedule:", err);
      });
  }, []);

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      const match = data.find(
        (item) =>
          item.month === parseInt(selectedMonth) &&
          item.year === parseInt(selectedYear)
      );
      setFilteredData(match || null);
    }
  }, [selectedMonth, selectedYear, data]);

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  const generateChartData = (data) => {
    return days.map((day) => ({
      name: day,
      value: data[`booking_${day.toLowerCase()}`] ?? 0,
      fill: getBarColor(day, data.tersibuk, data.tersepi),
    }));
  };

  const getBarColor = (day, tersibuk, tersepi) => {
    if (day === tersibuk) return "#DC2626"; // merah untuk tersibuk
    if (day === tersepi) return "#059669"; // hijau untuk tersepi
    return "#2563EB"; // biru muda untuk netral
  };

  const uniqueYears = [...new Set(data.map((item) => item.year))];

  return (
    <div className="">
      <h1
        style={{ fontFamily: "Playfair Display" }}
        className="text-6xl md:text-3xl font-semibold leading-tight mb-3"
      >
        Statistik Jadwal Hari
      </h1>
      <div className="flex gap-3 items-center mb-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  dark:placeholder-gray-400 "
        >
          <option selected>Pilih Bulan</option>
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  dark:placeholder-gray-400 "
        >
          <option value="">Pilih Tahun</option>
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {filteredData ? (
        <div className="border rounded-lg shadow p-4 bg-white max-w-md">
          <h3
            style={{ fontFamily: "Lora" }}
            className="text-lg font-semibold mb-2"
          >
            {months.find((m) => m.value === filteredData.month)?.label}{" "}
            {filteredData.year}
          </h3>
          {(() => {
            const chartData = generateChartData(filteredData);
            return (
              <BarChart width={400} height={250} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                {/* <YAxis /> */}
                <Tooltip />
                <Bar dataKey="value">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            );
          })()}
          <div className="mt-3 flex justify-center items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#DC2626] rounded-full" />
              <p
                style={{ fontFamily: "Poppins" }}
                className="font-medium text-xs text-gray-500"
              >
                Hari Tersibuk
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#059669] rounded-full" />
              <p
                style={{ fontFamily: "Poppins" }}
                className="font-medium text-xs text-gray-500"
              >
                Hari Tersepi
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#2563EB] rounded-full" />
              <p
                style={{ fontFamily: "Poppins" }}
                className="font-medium text-xs text-gray-500"
              >
                Hari Biasa
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">
          Tidak ada data untuk bulan dan tahun yang dipilih.
        </p>
      )}
    </div>
  );
};

export default Schedule;

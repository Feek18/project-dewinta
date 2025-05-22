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

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  const generateChartData = (tersibuk, tersepi) => {
    return days.map((day) => ({
      name: day,
      value: day === tersibuk ? 3 : day === tersepi ? 1 : 2,
    }));
  };

  const getBarColor = (day, tersibuk, tersepi) => {
    if (day === tersibuk) return "#ff4d4f"; // merah untuk tersibuk
    if (day === tersepi) return "#52c41a"; // hijau untuk tersepi
    return "#91d5ff"; // biru muda untuk netral
  };

  return (
    <div className="space-y-10">
      <h1
        style={{ fontFamily: "Playfair Display" }}
        className="text-6xl md:text-3xl font-semibold leading-tight"
      >
        Statistik Hari Tersibuk & Tersepi
      </h1>

      {data.map((item, index) => {
        const chartData = generateChartData(item.tersibuk, item.tersepi);
        return (
          <div key={index} className="border p-4 rounded-lg shadow bg-white">
            <h2 className="text-lg font-semibold mb-2">
              {new Date(0, item.month - 1).toLocaleString("id-ID", {
                month: "long",
              })} {" "}
              {item.year}
            </h2>
            <p>
              <strong>Tersibuk:</strong> {item.tersibuk}
            </p>
            <p>
              <strong>Tersepi:</strong> {item.tersepi}
            </p>

            <BarChart width={500} height={250} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis hide />
              <Tooltip />
              <Legend />
              <Bar dataKey="value">
                {chartData.map((entry, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={getBarColor(entry.name, item.tersibuk, item.tersepi)}
                  />
                ))}
              </Bar>
            </BarChart>
          </div>
        );
      })}
    </div>
  );
};

export default Schedule;

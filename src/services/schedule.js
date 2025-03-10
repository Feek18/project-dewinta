import { useState, useEffect } from 'react';
import axios from 'axios';

// Fungsi untuk mendapatkan data jadwal dari API
function fetchScheduleData() {
  return axios.get('http://localhost:8000/api/schedule')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching schedule data:', error);
      throw error;
    });
}

export { fetchScheduleData };

// Custom hook untuk mengambil data jadwal
export function useScheduleData() {
  const [scheduleData, setScheduleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tersepi, setTersepi] = useState(null);

  useEffect(() => {
    const getScheduleData = async () => {
      try {
        setLoading(true);
        const data = await fetchScheduleData();

        // Ambil bulan & tahun saat ini
        const currentMonth = new Date().getMonth() + 1; // getMonth() mulai dari 0
        const currentYear = new Date().getFullYear();

        // Cari data yang sesuai dengan bulan dan tahun ini
        const currentSchedule = data.data.find(
          (item) => item.month === currentMonth && item.year === currentYear
        );

        setScheduleData(data.data);
        if (currentSchedule) {
          setTersepi(currentSchedule.tersepi);
        } else {
          setTersepi(null);
        }
      } catch (err) {
        setError(err.message || 'Terjadi kesalahan saat mengambil data');
      } finally {
        setLoading(false);
      }
    };

    getScheduleData();
  }, []);

  return { scheduleData, tersepi, loading, error };
}

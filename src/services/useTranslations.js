import { useState, useEffect } from "react";
import axios from "axios";

const useTranslations = () => {
  const [translations, setTranslations] = useState(() => {
    // Ambil data dari localStorage saat pertama kali hook dipanggil
    const savedTranslations = localStorage.getItem("translations");
    return savedTranslations
      ? JSON.parse(savedTranslations)
      : { en: {}, id: {} };
  });

  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  useEffect(() => {
    // Cek apakah data sudah ada di localStorage, jika ada skip API call
    if (localStorage.getItem("translations")) {
      return;
    }

    axios
      .get("http://localhost:8000/api/translations")
      .then((res) => {
        const data = res.data.data;

        let translationMap = { en: {}, id: {} };

        data.forEach((item) => {
          translationMap.en[item.lang_code] = item.translation;
          translationMap.id[item.lang_code] = item.lang_id;
        });

        setTranslations(translationMap);

        // Simpan ke localStorage agar tidak perlu request lagi
        localStorage.setItem("translations", JSON.stringify(translationMap));
      })
      .catch((err) => console.error("Error fetching translations:", err));
  }, [currentLanguage]); // 🔥 Hanya dijalankan sekali saat pertama kali komponen dimuat

  // 🔄 Ubah bahasa & simpan ke localStorage
  const changeLanguage = (lang) => {
    localStorage.setItem("language", lang);
    setCurrentLanguage(lang);
    window.location.reload();
  };

  const text = (id) => translations?.[currentLanguage]?.[id] || `[${id}]`;

  return { text, currentLanguage, changeLanguage };
};

export default useTranslations;

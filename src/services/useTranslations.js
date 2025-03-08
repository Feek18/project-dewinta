import { useState, useEffect } from "react";
import axios from "axios";

const useTranslations = () => {
  const [translations, setTranslations] = useState({ id: {}, en: {} });
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/translations")
      .then((res) => {
        // console.log("📥 API Response:", res.data);
        const data = res.data.data;

        let translationMap = { en: {}, id: {} };

        // 🔹 Susun data ke dalam objek berdasarkan bahasa
        data.forEach((item) => {
          translationMap.en[item.lang_code] = item.translation;
          translationMap.id[item.lang_code] = item.lang_id;
        });

        // console.log("✅ Translations Updated:", translationMap);
        setTranslations(translationMap);
      })
      .catch((err) => console.error("❌ Error fetching translations:", err));
  }, [currentLanguage]);

  // 🔄 Ubah bahasa & simpan ke localStorage
  const changeLanguage = (lang) => {
    // console.log(`🌍 Bahasa diubah ke: ${lang}`);
    localStorage.setItem("language", lang);
    setCurrentLanguage(lang);
    window.location.reload();
  };

  // 🔍 Ambil teks berdasarkan bahasa yang dipilih
  const text = (id) => translations[currentLanguage]?.[id] || `[${id}]`;

  return { text, currentLanguage, changeLanguage };
};

export default useTranslations;

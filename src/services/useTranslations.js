import { useState, useEffect } from "react";
import axios from "axios";

const useTranslations = () => {
  const [translations, setTranslations] = useState(() => {
    const savedTranslations = localStorage.getItem("translations");
    return savedTranslations ? JSON.parse(savedTranslations) : null;
  });

  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  const [isLoading, setIsLoading] = useState(!translations);

  useEffect(() => {
    if (translations) {
      setIsLoading(false);
      return;
    }

    axios
      .get("http://localhost:8000/api/translations")
      .then((res) => {
        const data = res.data.data;

        if (!data || data.length === 0) {
          throw new Error("Empty translations data");
        }

        let translationMap = { en: {}, id: {} };

        data.forEach((item) => {
          translationMap.en[item.lang_code] = item.translation;
          translationMap.id[item.lang_code] = item.lang_id;
        });

        setTranslations(translationMap);
        localStorage.setItem("translations", JSON.stringify(translationMap));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching translations:", err);
        setIsLoading(false);
      });
  }, []); // 🔥 Tidak menggunakan `currentLanguage` agar tidak loop terus

  const changeLanguage = (lang) => {
    localStorage.setItem("language", lang);
    setCurrentLanguage(lang);
    setTranslations(JSON.parse(localStorage.getItem("translations"))); // ✅ Update tanpa reload
  };

  const text = (id) => {
    if (isLoading) return "Loading...";
    return translations?.[currentLanguage]?.[id] || `[${id}]`;
  };

  return { text, currentLanguage, changeLanguage, isLoading };
};

export default useTranslations;

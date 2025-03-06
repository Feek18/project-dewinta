import React, { useEffect, useState } from "react";
import { getImage } from "../../services/image";
import useTranslations from "../../services/useTranslations";

const Promo = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { text } = useTranslations(); // Ambil `text` dan `currentLanguage`

  useEffect(() => {
    getImage((data) => {
      // console.log("Data dari API:", data); // Debugging
      setImages(data);
      setLoading(false);
    });
  }, []);
  return (
    <>
      {images.length > 0 && (
        <section
          style={{
            backgroundImage: `url('http://localhost:8000/storage/${images[2].image_path}')`,
          }}
          className="relative mt-28 h-[330px] bg-cover bg-center"
        >
          {/* Overlay Hitam */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Konten (Text) */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
            <h2
              style={{ fontFamily: "Playfair Display" }}
              className="text-5xl font-bold"
            >
              {text("promo_01")}
            </h2>
            <p style={{ fontFamily: "Lora" }} className="mt-3 text-xl">
              {text("promo_02")}
            </p>
            <button
              style={{ fontFamily: "Playfair Display" }}
              className="mt-4 px-8 py-2 bg-[#A68A64] text-white"
            >
              {text("promo_03")}
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default Promo;

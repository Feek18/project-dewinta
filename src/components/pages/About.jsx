import React, { useEffect, useState } from "react";
import { getImage } from "../../services/image";
import useTranslations from "../../services/useTranslations";

const About = () => {
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
    <section id="about" className="mt-14 lg:mt-24">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-evenly items-center">
          {images.length > 0 && (
            <img
              className="lg:ml-12 w-[400px] md:w-[700px] rounded-lg shadow-lg"
              src={`http://localhost:8000/storage/${images[1].image_path}`}
              alt="About Image"
            />
          )}
          <div className="max-w-2x mx-8">
            <h1
              style={{ fontFamily: "Playfair Display" }}
              className="text-5xl font-semibold leading-tight"
            >
              {text("about_01")}
            </h1>
            <p
              style={{ fontFamily: "Lora" }}
              className="text-md mt-4 text-gray-700"
            >
              {text("about_02")}
              💄✨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

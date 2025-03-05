import React, { useEffect, useState } from "react";
import { getImage } from "../../services/image";

const Hero = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getImage((data) => {
      console.log("Data dari API:", data); // Debugging
      setImages(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="home" className="mt-14 lg:mt-24">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-evenly items-center gap-4">
          {/* Bagian Teks */}
          <div className="max-w-2xl text-center lg:text-left">
            <h1
              style={{ fontFamily: "Playfair Display" }}
              className="text-6xl md:text-8xl font-semibold leading-tight"
            >
              Look Beautiful,{" "}
              <span className="text-[#A68A64] font-bold">Be Confident</span>{" "}
              Every Day
            </h1>
            <p
              style={{ fontFamily: "Lora" }}
              className="text-lg mt-4 text-gray-700"
            >
              Bring your dream makeup look to life with a professional touch.
              From natural to glamorous makeup, we are ready to give you the
              best for every special moment!
            </p>
          </div>

          {/* Bagian Gambar */}
          <div className="flex justify-center">
            {images.length > 0 && (
              <div key={images.image_code}>
                <img
                  src={`http://localhost:8000/storage/${images[0].image_path}`}
                  alt="Hero Image"
                  className="w-[450px] md:w-[700px] rounded-md shadow-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

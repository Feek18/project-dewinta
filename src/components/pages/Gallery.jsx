import React, { useEffect, useState } from "react";
import Image from "../fragments/Image";
import { getImage } from "../../services/image";
import useTranslations from "../../services/useTranslations";

const Gallery = () => {
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
    <section id="gallery" className="mt-14 lg:mt-28">
      <div className="text-center">
        <h1
          style={{ fontFamily: "Playfair Display" }}
          className="text-5xl font-semibold leading-tight"
        >
          {text("gallery_01")}
        </h1>
        <p
          style={{ fontFamily: "Lora" }}
          className="text-lg mt-2 text-gray-700 max-w-4xl mx-auto"
        >
          {text("galery_02")}
        </p>
      </div>

      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {images.length > 0 && (
          <>
            <Image
              c={"rounded-lg col-span-1 row-span-2 object-cover w-full h-full"}
              src={`http://localhost:8000/storage/${images[10].image_path}`}
              alt="Beautiful Landscape 1"
            />
            <Image
              c={"rounded-lg col-span-1 object-cover w-full h-full"}
              src={`http://localhost:8000/storage/${images[4].image_path}`}
              alt="Beautiful Landscape 2"
            />
            <Image
              c={"rounded-lg col-span-1 object-cover w-full h-full"}
              src={`http://localhost:8000/storage/${images[5].image_path}`}
              alt="Beautiful Landscape 3"
            />
            <Image
              c={"rounded-lg col-span-1 object-cover w-full h-full"}
              src={`http://localhost:8000/storage/${images[6].image_path}`}
              alt="Beautiful Landscape 3"
            />
            <Image
              c={"rounded-lg col-span-1 object-cover w-full h-full"}
              src={`http://localhost:8000/storage/${images[7].image_path}`}
              alt="Beautiful Landscape 3"
            />
            <Image
              c={"rounded-lg col-span-1 object-cover w-full h-full"}
              src={`http://localhost:8000/storage/${images[8].image_path}`}
              alt="Beautiful Landscape 3"
            />
            <Image
              c={"rounded-lg col-span-1 row-span-2 object-cover w-full h-full"}
              src={`http://localhost:8000/storage/${images[9].image_path}`}
              alt="Beautiful Landscape 3"
            />
            <Image
              c={"rounded-lg col-span-1 object-cover w-full h-full"}
              src={`http://localhost:8000/storage/${images[3].image_path}`}
              alt="Beautiful Landscape 3"
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Gallery;

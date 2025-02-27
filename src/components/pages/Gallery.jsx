import React from "react";
import Image from "../fragments/Image";

const Gallery = () => {
  return (
    <section id="gallery" className="mt-14 lg:mt-28">
      <div className="text-center">
        <h1
          style={{ fontFamily: "Playfair Display" }}
          className="text-5xl font-semibold leading-tight"
        >
          Gallery
        </h1>
        <p
          style={{ fontFamily: "Lora" }}
          className="text-lg mt-2 text-gray-700 max-w-4xl mx-auto"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
          quibusdam?
        </p>
      </div>

      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <Image
          c={"rounded-lg col-span-1 row-span-2 object-cover w-full h-full"}
          src="./public/img/hero.png"
          alt="Beautiful Landscape 1"
        />
        <Image
          c={"rounded-lg col-span-1 object-cover w-full h-full"}
          src="./public/img/g1.jpg"
          alt="Beautiful Landscape 2"
        />
        <Image
          c={"rounded-lg col-span-1 object-cover w-full h-full"}
          src="./public/img/g2.jpg"
          alt="Beautiful Landscape 3"
        />
        <Image
          c={"rounded-lg col-span-1 object-cover w-full h-full"}
          src="./public/img/g3.jpg"
          alt="Beautiful Landscape 3"
        />
        <Image
          c={"rounded-lg col-span-1 object-cover w-full h-full"}
          src="./public/img/g4.jpg"
          alt="Beautiful Landscape 3"
        />
        <Image
          c={"rounded-lg col-span-1 object-cover w-full h-full"}
          src="./public/img/g5.jpg"
          alt="Beautiful Landscape 3"
        />
        <Image
          c={"rounded-lg col-span-1 row-span-2 object-cover w-full h-full"}
          src="./public/img/g6.jpg"
          alt="Beautiful Landscape 3"
        />
        <Image
          c={"rounded-lg col-span-1 object-cover w-full h-full"}
          src="./public/img/g7.jpg"
          alt="Beautiful Landscape 3"
        />
      </div>
    </section>
  );
};

export default Gallery;

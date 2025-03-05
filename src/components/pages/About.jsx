import React, { useEffect, useState } from "react";
import { getImage } from "../../services/image";

const About = () => {
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
              Beauty transformations that bring out your best self
            </h1>
            <p
              style={{ fontFamily: "Lora" }}
              className="text-md mt-4 text-gray-700"
            >
              At Dewinta Makeup, we believe that makeup is not just makeup, but
              an art that reinforces confidence and expresses personality. We
              provide professional makeup services for various needs, from
              natural daily makeup to glamorous looks for special events. With
              high-quality products and application techniques that suit your
              facial character, we are ready to help you look stunning in every
              precious moment. Discover the perfect touch of beauty with us!
              💄✨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

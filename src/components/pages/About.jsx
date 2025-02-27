import React from "react";

const About = () => {
  return (
    <section id="about" className="mt-14 lg:mt-36">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-evenly items-center">
          <img
            className="w-[400px] md:w-[700px] rounded-lg shadow-lg"
            src="./public/img/bg2.jpg"
            alt=""
          />
          <div className="max-w-2x mx-10">
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

import React from "react";

const Whyus = () => {
  return (
    <section>
      <div className="mt-14 lg:mt-24">
        <div className="text-center">
          <h1
            style={{ fontFamily: "Playfair Display" }}
            className="text-5xl font-semibold leading-tight"
          >
            Why Choose Us?
          </h1>
          <p
            style={{ fontFamily: "Lora" }}
            className="text-lg mt-4 text-gray-700 max-w-4xl mx-auto"
          >
            We understand that every face is unique. This is why we always
            provide the best service to ensure a makeup result that is not only
            beautiful but also suits your character and personality.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-14 gap-4 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3
              style={{ fontFamily: "Playfair Display" }}
              className="text-3xl font-semibold leading-tight"
            >
              Professional & Experienced
            </h3>
            <p
              style={{ fontFamily: "Lora" }}
              className="text-lg mt-4 text-gray-700 max-w-4xl mx-auto"
            >
              Our makeup artist team consists of professionals with years of
              experience in the beauty industry.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3
              style={{ fontFamily: "Playfair Display" }}
              className="text-3xl font-semibold leading-tight"
            >
              Premium Quality Products
            </h3>
            <p
              style={{ fontFamily: "Lora" }}
              className="text-lg mt-4 text-gray-700 max-w-4xl mx-auto"
            >
              We only use the best makeup products that are long-lasting,
              skin-safe, and suitable for different skin types.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3
              style={{ fontFamily: "Playfair Display" }}
              className="text-3xl font-semibold leading-tight"
            >
              Personalize the Look
            </h3>
            <p
              style={{ fontFamily: "Lora" }}
              className="text-lg mt-4 text-gray-700 max-w-4xl mx-auto"
            >
              Every client has different needs, and we are ready to create a
              look that suits your preferences and the event you are attending.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Whyus;

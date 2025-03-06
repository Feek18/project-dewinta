import React from "react";
import useTranslations from "../../services/useTranslations";

const Whyus = () => {
  const { text } = useTranslations(); // Ambil `text` dan `currentLanguage`
  return (
    <section>
      <div className="mt-14 lg:mt-24">
        <div className="text-center">
          <h1
            style={{ fontFamily: "Playfair Display" }}
            className="text-5xl font-semibold leading-tight"
          >
            {text("why_choose_us_01")}
          </h1>
          <p
            style={{ fontFamily: "Lora" }}
            className="text-lg mt-4 text-gray-700 max-w-4xl mx-auto"
          >
            {text("why_choose_us_02")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-14 gap-4 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3
              style={{ fontFamily: "Playfair Display" }}
              className="text-3xl font-semibold leading-tight"
            >
              {text("why_choose_us_box_01")}
            </h3>
            <p
              style={{ fontFamily: "Lora" }}
              className="text-lg mt-4 text-gray-700 max-w-4xl mx-auto"
            >
              {text("why_choose_us_desc_01")}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3
              style={{ fontFamily: "Playfair Display" }}
              className="text-3xl font-semibold leading-tight"
            >
              {text("why_choose_us_box_02")}
            </h3>
            <p
              style={{ fontFamily: "Lora" }}
              className="text-lg mt-4 text-gray-700 max-w-4xl mx-auto"
            >
              {text("why_choose_us_desc_02")}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3
              style={{ fontFamily: "Playfair Display" }}
              className="text-3xl font-semibold leading-tight"
            >
              {text("why_choose_us_box_03")}
            </h3>
            <p
              style={{ fontFamily: "Lora" }}
              className="text-lg mt-4 text-gray-700 max-w-4xl mx-auto"
            >
              {text("why_choose_us_desc_03")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Whyus;

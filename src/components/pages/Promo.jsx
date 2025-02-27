import React from "react";

const Promo = () => {
  return (
    <section
      style={{ backgroundImage: "url('/img/promo.jpg')" }}
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
          Special Promo Package for You!
        </h2>
        <p style={{ fontFamily: "Lora" }} className="mt-3 text-xl">
          Get up to 50% off select makeup products and discover exclusive
          packages designed specifically for your perfect look!
        </p>
        <button
          style={{ fontFamily: "Playfair Display" }}
          className="mt-4 px-8 py-2 bg-[#A68A64] text-white"
        >
          Reserv Now
        </button>
      </div>
    </section>
  );
};

export default Promo;

import React from "react";
import useTranslations from "../../services/useTranslations";

const Footer = () => {
  const { text } = useTranslations(); // Ambil `text` dan `currentLanguage`
  return (
    <footer className="bg-[#A68A64] mt-28">
      <div className="max-w-6xl mx-auto px-6 py-10 text-white">
        <div className="flex flex-col md:flex-row lg:justify-between lg:items-center gap-6">
          <div>
            <div className="flex items-center space-x-2">
              <img className="h-16 auto" src="./public/img/logo.png" alt="" />
              <p
                style={{ fontFamily: "Parisienne" }}
                className="font-bold text-2xl"
              >
                Dewinta Makeup
              </p>
            </div>
            <p style={{ fontFamily: "Lora" }} className="max-w-sm text-md mt-4">
              {text("footer_01")}
            </p>
          </div>
          <div style={{ fontFamily: "Playfair Display" }}>
            <h3 className="font-semibold text-white">Informations</h3>
            <ul className="mt-3 space-y-2 text-white">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Address</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div style={{ fontFamily: "Playfair Display" }}>
            <h3 className="font-semibold text-white">Company</h3>
            <ul className="mt-3 space-y-2 text-white">
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">News</a>
              </li>
            </ul>
          </div>
          <div style={{ fontFamily: "Playfair Display" }}>
            <h3 className="font-semibold text-white">Resources</h3>
            <ul className="mt-3 space-y-2 text-white">
              <li>
                <a href="#">Makeup</a>
              </li>
              <li>
                <a href="#">Beauty Model</a>
              </li>
              <li>
                <a href="#">Professional Artist</a>
              </li>
            </ul>
          </div>
        </div>
        {/* Garis */}
        <div className="border-t border-gray-300 my-6"></div>
        <div
          style={{ fontFamily: "Playfair Display" }}
          className="flex flex-col md:flex-row justify-between items-center text-sm text-white"
        >
          <p>
            © 2025 Dewint Makeup. All Rights Reserved. Your beauty, our
            inspiration.
          </p>
          <div className="flex space-x-4">
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

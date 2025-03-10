import { useEffect, useState } from "react";
import "./App.css";
import React from "react";
import Header from "./components/layouts/Header";
import Hero from "./components/pages/Hero";
import About from "./components/pages/About";
import Whyus from "./components/pages/Whyus";
import Image from "./components/fragments/Image";
import Gallery from "./components/pages/Gallery";
import Footer from "./components/pages/Footer";
import Promo from "./components/pages/Promo";
import { Calendar, CalendarProvider, Card, Textarea } from "@heroui/react";
import {
  Form,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Button,
} from "@heroui/react";
import axios from "axios";
import useTranslations from "./services/useTranslations";
import { getBooking } from "./services/booking";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardProduct from "./components/fragments/CardProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { getLayananSalon } from "./services/service";

function App() {
  const [submitted, setSubmitted] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const { text, currentLanguage } = useTranslations(); // Ambil `text` dan `currentLanguage`
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telp: "",
    alamat: "",
    date: "",
    layanan: "",
    id_layanan: "",
  });
  const [booking, setBooking] = useState([]);
  const [layanan, setLayanan] = useState([]);

  useEffect(() => {
    getBooking(setBooking);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "date" ? value.split("T")[0] : value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
  
    axios
      .post(
        "/api/midtrans", // Ensure this endpoint generates a Snap Token
        { ...formData, id_layanan: String(formData.id_layanan) },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data.snapToken) {
          // Initiate Midtrans payment
          window.snap.pay(res.data.snapToken, {
            onSuccess: function (result) {
              console.log("Payment successful:", result);
              toast.success("Payment successful!", {
                position: "top-right",
                autoClose: 3000,
              });
            }, 
            onPending: function (result) {
              console.log("Payment pending:", result);
              toast.warning("Payment is pending!", {
                position: "top-right",
                autoClose: 3000,
              });
            },

            onError: function (result) {
              console.log("Payment error:", result);
              toast.error("Payment failed!", {
                position: "top-right",
                autoClose: 3000,
              });
            },
            onClose: function () {
              console.log("Payment popup closed");
              toast.info("Payment process canceled.", {
                position: "top-right",
                autoClose: 3000,
              });
            },
          });
        } else {
          toast.error("Failed to retrieve payment token!", {
            position: "top-right",
            autoClose: 3000,
          });
        }
  
        // Reset form data after successful booking
        setFormData({
          name: "",
          telp: "",
          date: "",
          email: "",
          id_layanan: "",
          alamat: "",
        });
      })
      .catch((err) => {
        console.error("API Error:", err);
        toast.error("Failed to fetch booking data!", {
          position: "top-right",
          autoClose: 3000,
        });
  
        if (err.response && err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
      });
  };
  

  useEffect(() => {
    getLayananSalon(setLayanan);
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* navbar */}
      <Header />

      {/* hero */}
      <Hero />

      {/* product */}
      <div className="mt-24 px-8 lg:px-16">
        <h1
          style={{ fontFamily: "Playfair Display" }}
          className="text-6xl md:text-5xl font-semibold leading-tight mb-12 text-center"
        >
          Our services
        </h1>
        <CardProduct />
      </div>

      {/* reservation */}
      <section className="mt-20 px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:justify-center items-center gap-8">
          <Form
            className="flex flex-col"
            validationErrors={errors}
            onReset={() => setSubmitted(null)}
            onSubmit={handleSubmit}
          >
            {/* Container utama */}
            <div className="bg-white w-full lg:w-[700px] p-8">
              <h1
                style={{ fontFamily: "Playfair Display" }}
                className="text-4xl font-semibold leading-tight mb-8"
              >
                {text("reservation_01")}
              </h1>

              {/* Grid untuk form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Kolom Kiri */}
                <div className="flex flex-col gap-4">
                  <Input
                    isRequired
                    value={formData.name}
                    onChange={handleChange}
                    errorMessage={errors.name}
                    label={text("name")}
                    labelPlacement="outside"
                    name="name"
                    placeholder={text("enter_your_name")}
                  />

                  <Input
                    isRequired
                    value={formData.telp}
                    onChange={handleChange}
                    errorMessage={errors.telp}
                    label={text("telp")}
                    labelPlacement="outside"
                    name="telp"
                    placeholder="Enter your phone number"
                    type="number"
                  />
                  <Input
                    isRequired
                    value={formData.date}
                    onChange={handleChange}
                    errorMessage={errors.date}
                    label={text("date_booking")}
                    labelPlacement="outside"
                    name="date"
                    // placeholder="Enter your phone number"
                    type="date"
                  />
                </div>

                {/* Kolom Kanan */}
                <div className="flex flex-col gap-4">
                  <Input
                    isRequired
                    value={localStorage.getItem("email")}
                    onChange={handleChange}
                    errorMessage={errors.email}
                    label={text("email")}
                    labelPlacement="outside"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    readOnly
                  />
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Select
                      name="id_layanan"
                      id="id_layanan"
                      className="max-w-xs"
                      label="Nama Layanan"
                      placeholder="Pilih layanan"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          id_layanan: String(e.target.value),
                        })
                      }
                    >
                      {layanan.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {`${item.name} - Rp${item.harga.toLocaleString()}`}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <Textarea
                    isRequired
                    value={formData.alamat}
                    onChange={handleChange}
                    errorMessage={errors.alamat}
                    label="Address"
                    labelPlacement="outside"
                    name="alamat"
                    placeholder={text("address")}
                    minLength={10}
                  />
                </div>
              </div>
            </div>

            {/* Tombol Submit */}
            <div className="w-full flex justify-center items-center mt-6">
              <Button
                style={{ fontFamily: "Playfair Display" }}
                className="w-1/2 md:w-1/4 bg-[#A68A64] text-white rounded-none"
                type="submit"
              >
                {text("submit")}
              </Button>
            </div>
          </Form>
        </div>
      </section>

      {/* about */}
      <About />

      {/* why us */}
      <Whyus />

      {/* promo */}
      <Promo />

      {/* gallery */}
      <Gallery />

      {/* footer */}
      <Footer />
    </>
  );
}

export default App;

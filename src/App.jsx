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
import { Calendar, CalendarProvider, Textarea } from "@heroui/react";
import {
  Form,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Button,
} from "@heroui/react";
import { addToast } from "@heroui/react";
import { getLayananSalon } from "./services/service";

function App() {
  const [password, setPassword] = React.useState("");
  const [submitted, setSubmitted] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const [allFilms, setAllFilms] = useState([]);
  const [films, setFilms] = useState([]);

  // Real-time password validation
  const getPasswordError = (value) => {
    if (value.length < 4) {
      return "Password must be 4 characters or more";
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return "Password needs at least 1 uppercase letter";
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return "Password needs at least 1 symbol";
    }

    return null;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Custom validation checks
    const newErrors = {};

    // Password validation
    const passwordError = getPasswordError(data.password);

    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Username validation
    if (data.name === "admin") {
      newErrors.name = "Nice try! Choose a different username";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    if (data.terms !== "true") {
      setErrors({ terms: "Please accept the terms" });

      return;
    }

    // Clear errors and submit
    setErrors({});
    setSubmitted(data);
  };

  useEffect(() => {
    getLayananSalon((film) => {
      if (Array.isArray(film)) {
        setFilms(film);
        setAllFilms(film);
      } else {
        setFilms([]); // Pastikan films adalah array
      }
    });
  }, []);

  return (
    <>
      {/* navbar */}
      <Header />

      {/* hero */}
      <Hero />

      {/* reservation & product */}
      <section className="mt-28 px-16">
        <div className="flex justify-center items-center gap-4">
          <Form
            className="flex flex-col"
            validationErrors={errors}
            onReset={() => setSubmitted(null)}
            onSubmit={onSubmit}
          >
            {/* Container utama */}
            <div className="bg-white max-w-2xl w-[700px] p-8">
              <h1
                style={{ fontFamily: "Playfair Display" }}
                className="text-4xl font-semibold leading-tight mb-8"
              >
                Take your reservation now!!
              </h1>

              {/* Grid untuk form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Kolom Kiri */}
                <div className="flex flex-col gap-4">
                  <Input
                    isRequired
                    errorMessage={({ validationDetails }) => {
                      if (validationDetails.valueMissing)
                        return "Please enter your name";
                      return errors.name;
                    }}
                    label="Name"
                    labelPlacement="outside"
                    name="name"
                    placeholder="Enter your name"
                  />

                  <Input
                    isRequired
                    errorMessage={({ validationDetails }) => {
                      if (validationDetails.valueMissing)
                        return "Please enter your telp";
                      if (validationDetails.typeMismatch)
                        return "Please enter a valid phone number";
                    }}
                    label="No. Telp"
                    labelPlacement="outside"
                    name="telp"
                    placeholder="Enter your phone number"
                    type="number"
                  />

                  <Input
                    isRequired
                    errorMessage={({ validationDetails }) => {
                      if (validationDetails.valueMissing)
                        return "Please enter the booking date";
                    }}
                    label="Date Booking"
                    labelPlacement="outside"
                    name="book"
                    type="date"
                  />
                </div>

                {/* Kolom Kanan */}
                <div className="flex flex-col gap-4">
                  <Input
                    isRequired
                    errorMessage={({ validationDetails }) => {
                      if (validationDetails.valueMissing)
                        return "Please enter your email";
                      if (validationDetails.typeMismatch)
                        return "Please enter a valid email address";
                    }}
                    label="Email"
                    labelPlacement="outside"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                  />

                  <Textarea
                    isRequired
                    errorMessage={({ validationDetails }) => {
                      if (validationDetails.valueMissing)
                        return "Please enter your address";
                      if (validationDetails.tooShort)
                        return "Address is too short";
                    }}
                    label="Address"
                    labelPlacement="outside"
                    name="alamat"
                    placeholder="Enter your address"
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
                Submit
              </Button>
            </div>
          </Form>
          <div>
            <div className="bg-white shadow-md rounded-lg p-6 w-[330px]">
              {Array.isArray(films) && films.length > 0 ? (
                films.map((film) => (
                  <div key={film.id}>
                    <h2 className="text-lg font-bold text-gray-800">
                      {film.name}
                    </h2>
                    <p className="text-sm text-gray-500">{film.type}</p>
                    <p className="text-gray-700 mt-2">{film.desc}</p>
                    <div className="mt-4">
                      <span className="text-green-600 font-semibold">
                        Rp {film.harga.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Tidak ada data tersedia.</p>
              )}
            </div>
          </div>
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

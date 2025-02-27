import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
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

function App() {
  const [password, setPassword] = React.useState("");
  const [submitted, setSubmitted] = React.useState(null);
  const [errors, setErrors] = React.useState({});

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

  return (
    <>
      {/* navbar */}
      <Header />

      {/* hero */}
      <Hero />

      {/* reservation */}
      <section className="mt-28">
        <Form
          className="w-full flex flex-col items-center"
          validationErrors={errors}
          onReset={() => setSubmitted(null)}
          onSubmit={onSubmit}
        >
          {/* Grid untuk menampilkan form sejajar */}
          <div className="bg-white max-w-2xl w-full p-8">
            <h1
              style={{ fontFamily: "Playfair Display" }}
              className="text-4xl font-semibold leading-tight mb-8"
            >
              Take your reservation now!!
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <div className="flex flex-col gap-4">
                <Input
                  isRequired
                  errorMessage={({ validationDetails }) => {
                    if (validationDetails.valueMissing) {
                      return "Please enter your name";
                    }
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
                    if (validationDetails.valueMissing) {
                      return "Please enter your telp";
                    }
                    if (validationDetails.typeMismatch) {
                      return "Please enter a valid phone number";
                    }
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
                    if (validationDetails.valueMissing) {
                      return "Please enter the booking date";
                    }
                  }}
                  label="Date Booking"
                  labelPlacement="outside"
                  name="book"
                  type="date"
                />
              </div>
              <div className="flex flex-col gap-4">
                <Input
                  isRequired
                  errorMessage={({ validationDetails }) => {
                    if (validationDetails.valueMissing) {
                      return "Please enter your email";
                    }
                    if (validationDetails.typeMismatch) {
                      return "Please enter a valid email address";
                    }
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
                    if (validationDetails.valueMissing) {
                      return "Please enter your address";
                    }
                    if (validationDetails.tooShort) {
                      return "Address is too short";
                    }
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
          <div className="flex justify-center w-full mt-6">
            <Button
              style={{ fontFamily: "Playfair Display" }}
              className="w-1/2 md:w-1/4 bg-[#A68A64] text-white rounded-none"
              type="submit"
            >
              Submit
            </Button>
          </div>

          {/* Menampilkan data yang sudah dikirim */}
          {submitted && (
            <div className="text-small text-default-500 mt-4">
              Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
            </div>
          )}
        </Form>
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

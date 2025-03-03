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
import axios from "axios";

function App() {
  const [submitted, setSubmitted] = React.useState(null);
  const [errors, setErrors] = React.useState({});

  return (
    <>
      {/* navbar */}
      <Header />

      {/* hero */}
      <Hero />

      {/* reservation & product */}
      <section className="mt-20 px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:justify-center items-center gap-8">
          <Form
            className="flex flex-col"
            validationErrors={errors}
            onReset={() => setSubmitted(null)}
            // onSubmit={onSubmit}
          >
            {/* Container utama */}
            <div className="bg-white w-full lg:w-[700px] p-8">
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

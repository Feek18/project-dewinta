import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addToast } from "@heroui/react";

const ModalAuth = ({ isOpen, onClose, mode, setMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    telp: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("success");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        telp: "",
        address: "",
      });
      setErrors({});
      setShowAlert(false); // Reset alert saat modal dibuka
    }
  }, [isOpen, mode]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setShowAlert(false);

    try {
      if (mode === "login") {
        const response = await axios.post("http://localhost:8000/api/login", {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", formData.email);
        localStorage.setItem("name", response.data.user.name);

        addToast({
          title: "Login Successfully!",
          description: "You have logged in successfully.",
          color: "success",
        });

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        // Register dan langsung login
        const response = await axios.post(
          "http://localhost:8000/api/register",
          formData
        );

        // Simpan data ke sessionStorage untuk auto-login
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", formData.email);
        localStorage.setItem("name", response.data.user.name);
        localStorage.setItem("telp", response.data.user.telp);
        localStorage.setItem("address", response.data.user.address);

        addToast({
          title: "Registration Successful!",
          description: "You have been registered and logged in successfully.",
          color: "success",
        });

        // Tutup modal dan redirect ke halaman utama
        setTimeout(() => {
          onClose(); // Tutup modal
          setMode("login");
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      console.error(error);

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setAlertColor("danger");
        setAlertMessage(
          error.response?.data?.message || "Invalid credentials!"
        );
        setShowAlert(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Hapus error untuk field yang sedang diubah
    if (errors[name]) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  return (
    <>
      {showAlert && (
        <div className={`alert alert-${alertColor}`}>{alertMessage}</div>
      )}

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onClose}
        placement="top-center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {mode === "login" ? "Log in" : "Sign Up"}
          </ModalHeader>
          <form onSubmit={handleAuth}>
            <ModalBody>
              {mode === "signup" && (
                <>
                  <Input
                    label="Full Name"
                    name="name"
                    placeholder="Enter your name"
                    variant="bordered"
                    value={formData.name}
                    onChange={handleInputChange}
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.[0]}
                  />
                  <Input
                    label="Phone Number"
                    name="telp"
                    placeholder="Enter your phone number"
                    variant="bordered"
                    value={formData.telp}
                    onChange={handleInputChange}
                    isInvalid={!!errors.telp}
                    errorMessage={errors.telp?.[0]}
                  />
                  <Input
                    label="Address"
                    name="address"
                    placeholder="Enter your address"
                    variant="bordered"
                    value={formData.address}
                    onChange={handleInputChange}
                    isInvalid={!!errors.address}
                    errorMessage={errors.address?.[0]}
                  />
                </>
              )}
              <Input
                label="Email"
                name="email"
                placeholder="Enter your email"
                variant="bordered"
                value={formData.email}
                onChange={handleInputChange}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.[0]}
              />
              <Input
                label="Password"
                name="password"
                placeholder="Enter your password"
                type="password"
                variant="bordered"
                value={formData.password}
                onChange={handleInputChange}
                isInvalid={!!errors.password}
                errorMessage={errors.password?.[0]}
              />
              {mode === "signup" && (
                <Input
                  label="Confirm Password"
                  name="password_confirmation"
                  placeholder="Confirm your password"
                  type="password"
                  variant="bordered"
                  value={formData.password_confirmation}
                  onChange={handleInputChange}
                  isInvalid={!!errors.password_confirmation}
                  errorMessage={errors.password_confirmation?.[0]}
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onClick={onClose}
                disabled={loading}
              >
                Close
              </Button>
              <Button color="primary" type="submit" disabled={loading}>
                {loading
                  ? "Processing..."
                  : mode === "login"
                  ? "Sign in"
                  : "Sign up"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAuth;

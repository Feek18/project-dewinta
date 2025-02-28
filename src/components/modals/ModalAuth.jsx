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
  const [loading, setLoading] = useState(false); // ✅ Tambahkan state loading

  const navigate = useNavigate();

  // Reset form saat modal dibuka atau mode berubah
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
    }
  }, [isOpen, mode]);

  // Fungsi validasi password
  const getPasswordError = (value) => {
    if (typeof value !== "string") return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  // Fungsi validasi form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const passwordError = getPasswordError(formData.password);
    if (passwordError) newErrors.password = passwordError;

    if (mode === "signup") {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.telp) newErrors.telp = "Phone number is required";
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.password_confirmation) {
        newErrors.password_confirmation = "Set your password like before!";
      } else if (formData.password_confirmation !== formData.password) {
        newErrors.password_confirmation = "Passwords do not match!";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fungsi handle login/signup
  const handleAuth = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      if (mode === "login") {
        // ✅ Request API login
        const response = await axios.post("http://localhost:8000/api/login", {
          email: formData.email,
          password: formData.password,
        });

        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("email", formData.email);
        sessionStorage.setItem("name", response.data.user.name);

        addToast({
          title: "Login successfully!!",
          description: "Login has been successfully",
          color: "success",
        });

        setTimeout(() => {
          navigate("/"); // Ganti dengan halaman tujuan setelah login
          window.location.reload(); // Agar header diperbarui
        }, 1000);
      } else {
        // ✅ Request API register
        await axios.post("http://localhost:8000/api/register", formData);

        sessionStorage.setItem("name", formData.name);
        console.log("name ada ga", name);

        setAlertColor("success");
        setAlertMessage("Akun berhasil dibuat! Silakan login.");
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(true);
          setMode("login");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      setAlertColor("danger");
      setAlertMessage(error.response?.data?.message || "Something went wrong");
      setShowAlert(true);
    } finally {
      setLoading(false);
      onClose();
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
                    placeholder="Enter your name"
                    variant="bordered"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    isInvalid={!!errors.name}
                    errorMessage={errors.name}
                  />
                  <Input
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    variant="bordered"
                    value={formData.telp}
                    onChange={(e) =>
                      setFormData({ ...formData, telp: e.target.value })
                    }
                    isInvalid={!!errors.telp}
                    errorMessage={errors.telp}
                  />
                  <Input
                    label="Address"
                    placeholder="Enter your address"
                    variant="bordered"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    isInvalid={!!errors.address}
                    errorMessage={errors.address}
                  />
                </>
              )}
              {/* Email */}
              <Input
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                isInvalid={!!errors.email}
                errorMessage={errors.email}
              />

              {/* Password */}
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                variant="bordered"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                isInvalid={!!errors.password}
                errorMessage={errors.password}
              />
              {mode === "signup" && (
                <Input
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  type="password"
                  variant="bordered"
                  value={formData.password_confirmation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password_confirmation: e.target.value,
                    })
                  }
                  isInvalid={!!errors.password_confirmation}
                  errorMessage={errors.password_confirmation}
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

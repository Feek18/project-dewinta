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

const ModalAuth = ({ isOpen, onClose, mode, setMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState(""); // ✅ Tambahkan state alert
  const [alertColor, setAlertColor] = useState("success"); // ✅ Tambahkan state warna alert
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  // Fungsi reset form saat modal ditutup atau mode berubah
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
    });
    setErrors({});
  };

  useEffect(() => {
    if (isOpen) {
      resetForm(); // Reset saat modal dibuka
    }
  }, [isOpen, mode]);

  // Fungsi validasi password
  const getPasswordError = (value) => {
    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (!/[A-Z]/.test(value)) {
      return "Password must have at least 1 uppercase letter";
    }
    if (!/[^a-zA-Z0-9]/.test(value)) {
      return "Password must have at least 1 special character";
    }
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
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (mode === "signup") {
      if (!formData.name) {
        newErrors.name = "Name is required";
      }
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = "Phone number is required";
      }
      if (!formData.address) {
        newErrors.address = "Address is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fungsi Login atau Signup
  const handleAuth = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Jika validasi gagal, hentikan proses submit
    }

    if (mode === "login") {
      sessionStorage.setItem("email", formData.email);
      sessionStorage.setItem("password", formData.password);

      setAlertColor("success");
      setAlertMessage("Login berhasil! Anda akan diarahkan ke dashboard.");
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        navigate("/");
      }, 500);
    } else {
      setAlertColor("success");
      setAlertMessage("Akun berhasil dibuat! Silakan login.");
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        setMode("login"); // ✅ Ganti ke mode login setelah signup berhasil
      }, 1000);
    }

    onClose(); // ✅ Tutup modal setelah berhasil login/signup
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
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    isInvalid={!!errors.phoneNumber}
                    errorMessage={errors.phoneNumber}
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
            </ModalBody>
            <ModalFooter className="flex flex-col">
              <div className="flex justify-end items-center gap-3 w-full">
                <div className="flex items-center gap-3">
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    {mode === "login" ? "Sign in" : "Sign up"}
                  </Button>
                </div>
              </div>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAuth;

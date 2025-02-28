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

  // Fungsi handle login/signup
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Reset error sebelum request

    try {
      if (mode === "login") {
        // ✅ API Login
        const response = await axios.post("http://localhost:8000/api/login", {
          email: formData.email,
          password: formData.password,
        });

        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("email", formData.email);
        sessionStorage.setItem("name", response.data.user.name);

        addToast({
          title: "Login Successfully!",
          description: "You have logged in successfully.",
          color: "success",
        });

        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } else {
        // ✅ API Register
        const response = await axios.post(
          "http://localhost:8000/api/register",
          formData
        );

        sessionStorage.setItem("name", response.data.user.name);

        setAlertColor("success");
        setAlertMessage("Account created successfully! Please log in.");
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(true);
          setMode("login");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setAlertColor("danger");
        setAlertMessage(
          error.response?.data?.message || "Something went wrong"
        );
        setShowAlert(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } finally {
      setLoading(false);
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
                    errorMessage={errors.name?.[0]}
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
                    errorMessage={errors.telp?.[0]}
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
                    errorMessage={errors.address?.[0]}
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
                errorMessage={errors.email?.[0]}
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
                errorMessage={errors.password?.[0]}
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

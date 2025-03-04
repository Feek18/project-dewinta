import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import axios from "axios";

const ModalEdit = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telp: "",
    address: "",
  });

  // Fetch data user dari database saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token"); // Ambil token dari localStorage

      const response = await axios.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Set nilai input dengan data dari API
      setFormData({
        name: response.data.name || "",
        email: response.data.email || "",
        telp: response.data.telp || "",
        address: response.data.address || "",
      });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      alert("Failed to fetch user data!");
    }
  };

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:8000/api/user/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile updated successfully!");
      onClose(); // Tutup modal setelah update
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile!");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="top-center"
      onOpenChange={onClose}
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Update Profile
        </ModalHeader>
        <ModalBody>
          <>
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              variant="bordered"
            />
            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              variant="bordered"
            />
            <Input
              label="Phone Number"
              name="telp"
              value={formData.telp}
              onChange={handleInputChange}
              variant="bordered"
            />
            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              variant="bordered"
            />
          </>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={handleUpdateProfile}>Save</Button>
          <Button color="danger" variant="flat" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalEdit;

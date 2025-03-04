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

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: sessionStorage.getItem("name") || "",
        email: sessionStorage.getItem("email") || "",
        telp: sessionStorage.getItem("telp") || "",
        address: sessionStorage.getItem("address") || "",
      });
    }
  }, [isOpen]);

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateProfile = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:8000/api/user/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Perbarui sessionStorage dengan data yang baru
      sessionStorage.setItem("name", response.data.user.name);
      sessionStorage.setItem("email", response.data.user.email);
      sessionStorage.setItem("telp", response.data.user.telp);
      sessionStorage.setItem("address", response.data.user.address);

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
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={handleUpdateProfile}>
            Save
          </Button>
          <Button color="danger" variant="flat" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalEdit;

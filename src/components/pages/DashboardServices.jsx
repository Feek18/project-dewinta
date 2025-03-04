import React, { useEffect, useState } from "react";
import TableCol from "../fragments/TableCol";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";
import ModalEdit from "../modals/ModalEdit";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { getLayananSalon } from "../../services/service";
import Sidebar from "../layouts/Sidebar";
import NavbarD from "../layouts/NavbarD";
import { Alert } from "@heroui/react";

const Dashboard = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [email, setEmail] = useState(sessionStorage.getItem("email"));
  const [name, setName] = useState(sessionStorage.getItem("name"));
  const [isOn, setIsOn] = useState(false);
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);

  // Handle perubahan ukuran layar
  useEffect(() => {
    const handleResize = () => {
      const isNowDesktop = window.innerWidth >= 768;
      setIsDesktop(isNowDesktop);
      if (isNowDesktop) onOpen(); // Auto open di desktop
      else onClose(); // Auto close di mobile
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Panggil saat pertama kali render

    return () => window.removeEventListener("resize", handleResize);
  }, [onOpen, onClose]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    getLayananSalon(setDatas);
  }, []);

  console.log("State Datas:", datas);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <NavbarD sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="bg-white grow">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Dashboard actions */}
              <div className="sm:flex sm:justify-between sm:items-center mb-8">
                {/* Left: Title */}
                <div className="mb-4 sm:mb-0">
                  <h1
                    style={{ fontFamily: "Lora" }}
                    className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-semibold"
                  >
                    Hello {name}, Welcome to Dashboard !! 
                  </h1>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

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
  NavbarItem,
  Link,
} from "@heroui/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { path } from "framer-motion/client";
import ModalEdit from "../modals/ModalEdit";

const DashTable = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("left");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [email, setEmail] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(false);

  // Handle perubahan ukuran layar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsDesktop(true);
        onOpen(); // Auto open saat desktop
      } else {
        setIsDesktop(false);
        onClose(); // Tutup saat masuk mode mobile
      }
    };

    handleResize(); // Panggil saat komponen pertama kali dirender
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [onOpen, onClose]);

  const handleOpen = () => {
    if (!isDesktop) onOpen(); // Hanya buka jika mobile
  };

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail && storedEmail !== email) {
      setEmail(storedEmail);
      setIsLogin(true);
    }
  }, [email]); // Dependensi agar tidak menyebabkan infinite re-render

  const handleLogout = () => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password");
    setIsLogin(false);
    setEmail(null);
    navigate("/");
  };

  return (
    <>
      <div className="relative flex">
        {/* DRAWER */}
        <Drawer
          backdrop="transparent"
          isOpen={isOpen}
          placement={placement}
          onOpenChange={onOpenChange}
        >
          <DrawerContent className="bg-white shadow-lg w-[300px] h-full rounded-none fixed left-0 top-0">
            {(onClose) => (
              <>
                <DrawerHeader className="flex flex-col gap-1 text-lg mt-3">
                  <div className="flex items-center gap-2">
                    <img
                      className="h-12 auto"
                      src="./public/img/logo.png"
                      alt="Logo"
                    />
                    <p
                      style={{ fontFamily: "Parisienne" }}
                      className="font-bold text-xl"
                    >
                      Dewinta Makeup
                    </p>
                  </div>
                </DrawerHeader>
                <hr className="my-3" />
                <DrawerBody className="text-gray-600">
                  <ul className="flex flex-col gap-3">
                    {[
                      { name: "Dashboard", icon: "🏠", path: "/dashboard" },
                      { name: "Table", icon: "📊", path: "/dashboard-table" },
                    ].map((menu, index) => (
                      <li
                        style={{ fontFamily: "Lora" }}
                        key={index}
                        className="flex items-center p-3 rounded-lg cursor-pointer 
                   hover:bg-[#b3976f] transition duration-200"
                      >
                        {/* <span className="text-xl">{menu.icon}</span> */}
                        <a
                          href={menu.path}
                          className="text-lg font-medium text-gray-700 hover:text-white"
                        >
                          {menu.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </DrawerBody>

                <DrawerFooter className="flex justify-between">
                  {!isDesktop && (
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  )}
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Drawer>

        {/* CONTAINER UNTUK TABLE */}
        <div
          className={`container mx-auto transition-all duration-300 ${
            isOpen ? "ml-[300px]" : "ml-0"
          }`}
        >
          <Navbar shouldHideOnScroll>
            <NavbarBrand>
              {!isDesktop && (
                <div className="flex justify-center mb-4 absolute left-4 top-4">
                  <Button
                    className="capitalize px-4 py-2 text-lg"
                    onPress={handleOpen}
                  >
                    Open Drawer
                  </Button>
                </div>
              )}
            </NavbarBrand>
            <NavbarContent justify="end">
              <Dropdown>
                <DropdownTrigger>
                  <User
                    as="button"
                    avatarProps={{
                      isBordered: true,
                      src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                    }}
                    className="transition-transform"
                    description={email}
                    name="Just Feek Me"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-bold">Signed in as</p>
                    <p className="font-bold">{email}</p>
                  </DropdownItem>
                  <DropdownItem asChild>
                    <Link className="text-black" href="/dashboard">
                      Dashboard
                    </Link>
                  </DropdownItem>
                  <DropdownItem onClick={() => setIsOn(true)}>
                    Edit Profile
                  </DropdownItem>
                  <DropdownItem
                    className="text-danger-500"
                    key="logout"
                    color="danger"
                    onClick={handleLogout}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
          </Navbar>
          <div className="overflow-x-auto bg-white pt-14 p-4">
            <TableCol />
          </div>
        </div>
      </div>
      <ModalEdit isOpen={isOn} onClose={() => setIsOn(false)} />
    </>
  );
};

export default DashTable;

import React, { useEffect, useState } from "react";
import { addToast } from "@heroui/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@heroui/react";
import ModalAuth from "../modals/ModalAuth";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";
import ModalEdit from "../modals/ModalEdit";
import { handleLogout } from "../../services/auth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(sessionStorage.getItem("name") || "");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Whyus", id: "whyus" },
    { name: "Gallery", id: "gallery" },
  ];

  useEffect(() => {
    const checkLogin = () => {
      const storedEmail = sessionStorage.getItem("email");
      const storedName = sessionStorage.getItem("name");
      if (storedEmail) {
        setEmail(storedEmail);
        setIsLogin(true);
      } else {
        setEmail(null);
        setIsLogin(false);
      }

      if (storedName) {
        setName(storedName);
      } else {
        setName(null);
      }
    };

    checkLogin();
    // Pastikan name juga diperbarui ketika ada perubahan di sessionStorage
    const handleStorageChange = () => {
      checkLogin();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand className="flex items-center gap-24">
            <div className="flex items-center gap-2">
              <img
                className="h-12 auto"
                src="./public/img/logo.png"
                alt="Logo"
              />
              <p
                style={{ fontFamily: "Parisienne" }}
                className="font-bold text-3xl"
              >
                Dewinta Makeup
              </p>
            </div>
            <div className="lg:flex items-center gap-6 hidden">
              {menuItems.map((item) => (
                <NavbarItem key={item.id}>
                  <Link
                    onClick={() => {
                      const element = document.getElementById(item.id);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    style={{ fontFamily: "Playfair Display" }}
                    color="foreground"
                    href="#"
                  >
                    {item.name}
                  </Link>
                </NavbarItem>
              ))}
            </div>
          </NavbarBrand>
        </NavbarContent>

        {/* Jika belum login */}
        {!isLogin ? (
          <NavbarContent className="hidden sm:flex gap-2" justify="end">
            <NavbarItem>
              <Button
                style={{ fontFamily: "Playfair Display" }}
                className="bg-[#A68A64] text-md text-white rounded-none px-8"
                onClick={() => {
                  setAuthMode("login");
                  setIsModalOpen(true);
                }}
              >
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                style={{ fontFamily: "Playfair Display" }}
                className="bg-transparent text-md rounded-none"
                onClick={() => {
                  setAuthMode("signup");
                  setIsModalOpen(true);
                }}
              >
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
        ) : (
          <div className="flex items-center gap-4">
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
                  name={name}
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
                <DropdownItem onClick={() => setIsOpen(true)}>
                  Edit Profile
                </DropdownItem>
                <DropdownItem
                  className="text-danger-500"
                  key="logout"
                  color="danger"
                  onClick={() =>
                    handleLogout(
                      setEmail,
                      setIsLogin,
                      setName,
                      navigate,
                      addToast
                    )
                  }
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}

        {/* Navbar menu untuk tampilan mobile */}
        <NavbarMenu>
          {menuItems.map((item) => (
            <NavbarMenuItem key={item.id}>
              <Link
                className="w-full"
                color={"foreground"}
                href="#"
                size="md"
                onClick={() => {
                  const element = document.getElementById(item.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
          <div className="flex items-center gap-3">
            <NavbarItem>
              <Button
                style={{ fontFamily: "Playfair Display" }}
                className="bg-[#A68A64] text-md text-white rounded-none px-8"
                onClick={() => {
                  setAuthMode("login");
                  setIsModalOpen(true);
                }}
              >
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                onClick={() => {
                  setAuthMode("signup");
                  setIsModalOpen(true);
                }}
                style={{ fontFamily: "Playfair Display" }}
                className="bg-transparent text-md rounded-none"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </div>
        </NavbarMenu>
      </Navbar>

      {/* Modal Auth */}
      <ModalAuth
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={authMode}
        setMode={setAuthMode}
      />
      {/* Modal Edit */}
      <ModalEdit isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Header;

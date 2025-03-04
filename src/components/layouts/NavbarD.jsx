import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
  Input,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";
import ModalEdit from "../modals/ModalEdit";

export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

const NavbarD = ({ sidebarOpen, setSidebarOpen, variant = "default" }) => {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState(sessionStorage.getItem("email"));
  const [name, setName] = useState(sessionStorage.getItem("name"));
  const [isOn, setIsOn] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password");
    setIsLogin(false);
    setEmail(null);
    navigate("/");
  };
  return (
    <>
      <header className={`sticky top-0 bg-white z-30`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between h-16 ${
              variant === "v2" || variant === "v3"
                ? ""
                : "lg:border-b border-gray-200 dark:border-gray-700/60"
            }`}
          >
            {/* Header: Left side */}
            <div className="flex">
              {/* Hamburger button */}
              <button
                className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 lg:hidden"
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarOpen(!sidebarOpen);
                }}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="4" y="5" width="16" height="2" />
                  <rect x="4" y="11" width="16" height="2" />
                  <rect x="4" y="17" width="16" height="2" />
                </svg>
              </button>
            </div>

            {/* Header: Right side */}
            <div className="flex items-center space-x-3">
              <div>
                <Input
                  classNames={{
                    base: "max-w-full sm:max-w-[10rem] h-10",
                    mainWrapper: "h-full",
                    input: "text-small",
                    inputWrapper:
                      "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                  }}
                  placeholder="Type to search..."
                  size="sm"
                  startContent={<SearchIcon size={18} />}
                  type="search"
                />
              </div>
              <hr className="w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none" />
              {/* <UserMenu align="right" /> */}
              <Dropdown placement="">
                <DropdownTrigger>
                  <Avatar
                    as="button"
                    className="transition-transform border-yellow-500"
                    color="warning"
                    name="Jason Hughes"
                    size="sm"
                    isBordered
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{email}</p>
                  </DropdownItem>
                  <DropdownItem>Dashboard</DropdownItem>
                  <DropdownItem onClick={() => setIsOn(true)}>
                    Edit Profile
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onClick={handleLogout}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </header>
      <ModalEdit isOpen={isOn} onClose={() => setIsOn(false)} />
    </>
  );
};

export default NavbarD;

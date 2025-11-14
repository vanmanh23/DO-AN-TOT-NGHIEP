import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./_components/Navbar";
import Header from "./_components/Header";
import { useState } from "react";
import { toast } from "sonner";

export interface NavbarProps {
  isOpenNavbar?: boolean;
  handleOpenNavbar?: () => void;
}

export default function Component() {
  const [hidenNavbar, setHidenNavbar] = useState<boolean>(false);
  const naviagate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    toast.error("You are not logged in!", {
      duration: 2000,
      position: "bottom-right",
      richColors: true,
    });
    naviagate("/");
  }
  const handleHidenNavbar = () => {
    setHidenNavbar(!hidenNavbar);
  };
  return (
    <>
      <div className="relative w-screen min-h-screen flex flex-row">
        <div className="2xl:relative xl:relative lg:relative md:relative sm:relative absolute top-0 left-0 z-30 shadow-right w-fit h-screen">
          <Navbar
            isOpenNavbar={hidenNavbar}
            handleOpenNavbar={handleHidenNavbar}
          />
        </div>
        <div className="flex flex-col w-full">
          <Header handleOpenNavbar={handleHidenNavbar} />
          <Outlet />
        </div>
      </div>
    </>
  );
}

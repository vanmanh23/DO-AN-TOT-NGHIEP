import { X } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../../../store/store";
import { setOption } from "../../../features/navbarsection/navbarSection";
import type { NavbarProps } from "../_layout";
import { bottom_navbar, menuItems } from "../../../constants";
import { getFilteredMenuForUser } from "./getFilteredMenuForUser";

export default function Navbar({
  isOpenNavbar,
  handleOpenNavbar,
}: NavbarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const roles = useSelector((state: RootState) => state.roles.value);
  const handleOption = (nameOption: string): void => {
    dispatch(setOption(nameOption));
  };
  const filteredItems = getFilteredMenuForUser(roles);

  const stateOption = useSelector(
    (state: RootState) => state.option.valueOption
  );
  useEffect(() => {}, [stateOption]);
  return (
    <div className="h-full">
      <div
        className={`sm:flex md:flex xl:flex 2xl:flex flex-col justify-between h-full space-y-4 p-5 overflow-hidden transition-all duration-200 ease-in-out hidden`}
        style={{
          width: isOpenNavbar ? "240px" : "86px",
          minWidth: isOpenNavbar ? "240px" : "86px",
          willChange: "width",
        }}
      >
        <div>
          <div className="outline-none">
            <Link
              to="/admin"
              className="outline-none"
              onClick={() => handleOption("Dashboard")}
            >
              <img
                src="/src/assets/logo_img.png"
                alt="logo"
                style={{
                  width: isOpenNavbar ? "50px" : "38px",
                  height: isOpenNavbar ? "50px" : "38px",
                }}
              />
            </Link>
          </div>
          <div className="flex flex-col mt-3">
            {filteredItems.map((item, key) => (
              <Link
                key={key}
                to={item.link}
                className="font-medium"
                onClick={() => handleOption(item.name)}
              >
                <p
                  className={`p-2 hover:bg-gray-200 rounded-md flex items-center gap-2 transition-all duration-300 ${
                    stateOption === item.name
                      ? "bg-gray-200 text-menu-items"
                      : "text-secondary"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span
                    className={`
      transition-all duration-300 ease-in-out
      whitespace-nowrap overflow-hidden text-sm
      ${isOpenNavbar ? "opacity-100 ml-2 visible" : "opacity-0 ml-0 invisible"}
    `}
                  >
                    {item.name}
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div>
          {bottom_navbar.map((item, key) => (
            <Link
              key={key}
              to={item.link}
              className="text-menu-items font-medium"
            >
              <p
                className={`p-3 hover:bg-gray-200 rounded-md flex items-center gap-2 transition-all duration-300 ${
                  stateOption === item.name
                    ? "bg-gray-200 text-menu-items"
                    : "text-secondary"
                }`}
              >
                <span>{item.icons}</span>
                <span
                  className={`
      transition-all duration-300 ease-in-out
      whitespace-nowrap overflow-hidden text-sm
      ${isOpenNavbar ? "opacity-100 ml-2 visible" : "opacity-0 ml-0 invisible"}
    `}
                >
                  {item.name}
                </span>
              </p>
            </Link>
          ))}
        </div>
      </div>
      {/*  */}
      <div
        className={` h-screen 2xl:hidden xl:hidden lg:hidden md:hidden sm:hidden ${
          isOpenNavbar ? "flex w-screen" : "hidden w-0"
        } flex-col justify-start space-y-4 p-5 bg-white z-30`}
      >
        <div className="flex flex-row justify-end">
          <X onClick={handleOpenNavbar} className="cursor-pointer" />
        </div>
        <ul>
          {menuItems.map((item, key) => (
            <Link
              key={key}
              to={item.link}
              className="font-medium"
              onClick={() => handleOption(item.name)}
            >
              <li
                className={`p-3 hover:bg-gray-200 rounded-md flex flex-row items-center gap-2 ${
                  stateOption === item.name
                    ? "bg-gray-200 text-menu-items"
                    : "text-secondary"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

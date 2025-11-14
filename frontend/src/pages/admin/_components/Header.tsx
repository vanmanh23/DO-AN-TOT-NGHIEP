import { useEffect, useState } from "react";
import {
  AlignJustify,
  ChevronDown,
  CircleUser,
  Info,
  LogOut,
  Settings,
  UserPlus,
  Users,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/store";
import type { NavbarProps } from "../_layout";
import { toast } from "sonner";
import { setRoles } from "../../../features/userRoles";
import { GetEmailFromJWT, GetUserByEmail } from "../../../apis/authApis";

export default function Header({handleOpenNavbar}: NavbarProps) {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const dispatch = useDispatch<AppDispatch>();
  const userRoles = useSelector((state: RootState) => state.roles.value);
   const stateOption = useSelector(
    (state: RootState) => state.option.valueOption
  );
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logout successfully!", { duration: 2000, position: "bottom-right",richColors: true }, );
  };
  
  useEffect(() => {
      const getUserFromJWT = async (jwt: string) => {
       const email = await GetEmailFromJWT(jwt);
       if(email.result) {
        const userInf = await GetUserByEmail(email.result);
        setUserInfo(userInf.result);
        dispatch(setRoles(userInf.result.roles));
       }
      };
      const jwt = localStorage.getItem("token");
      if (!jwt) {
        navigate("/");
      }else {
        getUserFromJWT(jwt);
      }
    }, [])
  return (
    <div className="relative py-6 px-6">
      <div className="">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-center items-center gap-3">
            <AlignJustify size={18} onClick={handleOpenNavbar} className="cursor-pointer"/>
            <p className="md:text-2xl text-sm font-semibold">{stateOption}</p>
          </div>
          <div className="md:flex sm:flex xl:flex 2xl:flex hidden flex-row justify-between gap-7 text-menu-items">
            <Popover>
              <PopoverTrigger asChild>
                <div
                  className="flex flex-row items-center cursor-pointer"
                  onClick={() => setOpenDropdown(!openDropdown)}
                >
                  <CircleUser
                    size={20}
                    color="#919191"
                    className="cursor-pointer"
                  />
                  <ChevronDown
                    size={14}
                    color="#919191"
                    className={`cursor-pointer transition-transform duration-300 ${
                      openDropdown ? "-rotate-180" : ""
                    }`}
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-56 bg-white border border-gray-200 outline-none shadow-slate-200">
                <div className="flex flex-col text-xs">
                  <div className="flex flex-row items-center gap-2">
                    <CircleUser
                      size={18}
                      color="#919191"
                      className="cursor-pointer"
                    />
                    <p className="text-sm">{userInfo.username}</p>
                  </div>
                  <hr className="border-t border-gray-100 my-2" />
                  {userRoles.includes("ROLE_ADMIN") && (
                    <div className="flex flex-row items-center gap-1 p-2 hover:bg-slate-100 rounded-md outline-none text-menu-items/70">
                      <UserPlus size={18}/>
                      <Link to="/admin/add_account">Add account</Link>
                    </div>
                  )}

                  <div className="flex flex-row items-center gap-1 p-2 hover:bg-slate-100 rounded-md outline-none text-menu-items/70">
                    <Users size={18}/>
                    <Link to="/aboutus">About us</Link>
                  </div>
                  <div className="flex flex-row items-center gap-1 p-2 hover:bg-slate-100 rounded-md outline-none text-menu-items/70">
                    <Settings size={18}/>
                    <Link to="/admin/setting">Setting</Link>
                  </div>
                  <hr className="border-t border-gray-100 my-2" />
                  <div className="flex flex-row items-center gap-1 p-2 hover:bg-slate-100 rounded-md outline-none text-secondary">
                    <Info size={18}/>
                    <Link to="/help">Help</Link>
                  </div>
                  <div
                    onClick={handleLogout}
                    className="flex cursor-pointer flex-row items-center gap-1 p-2 hover:bg-slate-100 rounded-md outline-none text-secondary"
                  >
                    <LogOut size={18}/>
                    <p>Sign Out</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}

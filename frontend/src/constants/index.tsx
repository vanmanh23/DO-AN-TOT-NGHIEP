import {
  ClipboardCheck,
  ClipboardPaste,
  FileUser,
  Info,
  Layers,
  LayoutDashboard,
  ListCheck,
  Rows3,
  Settings,
  Users,
} from "lucide-react";
import PatientIcon from "./../assets/patient-profile-people-svgrepo-com.svg";
import usersIcon from "./../assets/user-plus-alt-1-svgrepo-com.svg";
import sizefilesIcon from "./../assets/size-svgrepo-com.svg";
import studiesIcon from "./../assets/phase6-svgrepo-com.svg";
import type { JSX } from "react";

// export const menuItems = [
//   {
//     name: "Dashboard",
//     link: "/admin",
//     icon: <LayoutDashboard size={18}/>,
//   },
//   {
//     name: "Receive",
//     link: "/admin/receive",
//     icon: <ClipboardPaste size={18}/>,
//   },
//   {
//     name: "Patients",
//     link: "/admin/patients",
//     icon: <FileUser size={18}/>,
//   },
//   {
//     name: "Orders",
//     link: "/admin/orders",
//     icon: <ListCheck size={18}/>,
//   },
//   {
//     name: "Worklist",
//     link: "/admin/worklist",
//     icon: <Rows3 size={18}/>,
//   },
//   {
//     name: "Completed examination",
//     link: "/admin/completed_examination",
//     icon: <ClipboardCheck size={18}/>,
//   },
//   {
//     name: "Service Items",
//     link: "/admin/service_items",
//     icon: <ClipboardCheck size={18}/>,
//   },
//   {
//     name: "Doctors Management",
//     link: "/admin/doctor_management",
//     icon: <ClipboardCheck size={18}/>,
//   },
//   {
//     name: "Studies",
//     link: "/admin/studies",
//     icon: <Layers size={18}/>,
//   },
//   {
//     name: "User management",
//     link: "/admin/usermanagement",
//     icon: <Users size={18}/>,
//   },
// ];
export interface MenuItem {
  name: string;
  link: string;
  icon: JSX.Element;
}

// Mảng menuItems gốc
export const menuItems: readonly MenuItem[] = [
  {
    name: "Dashboard",
    link: "/admin",
    icon: <LayoutDashboard size={18}/>,
  },
  {
    name: "Receive",
    link: "/admin/receive",
    icon: <ClipboardPaste size={18}/>,
  },
  {
    name: "Patients",
    link: "/admin/patients",
    icon: <FileUser size={18}/>,
  },
  {
    name: "Orders",
    link: "/admin/orders",
    icon: <ListCheck size={18}/>,
  },
  {
    name: "Worklist",
    link: "/admin/worklist",
    icon: <Rows3 size={18}/>,
  },
  {
    name: "Completed examination",
    link: "/admin/completed_examination",
    icon: <ClipboardCheck size={18}/>,
  },
  {
    name: "Service Items",
    link: "/admin/service_items",
    icon: <ClipboardCheck size={18}/>,
  },
  {
    name: "Device Management",
    link: "/admin/device_management",
    icon: <ClipboardCheck size={18}/>,
  },
  {
    name: "Doctors Management",
    link: "/admin/doctor_management",
    icon: <ClipboardCheck size={18}/>,
  },
  {
    name: "Studies",
    link: "/admin/studies",
    icon: <Layers size={18}/>,
  },
  {
    name: "User management",
    link: "/admin/usermanagement",
    icon: <Users size={18}/>,
  },
] as const;

export const bottom_navbar = [
  {
    name: "Help & Support",
    link: "/help",
    icons: <Info size={18}/>,
  },
  {
    name: "Setting",
    link: "/admin/setting",
    icons: <Settings size={18}/>,
  },
  {
    name: "About us",
    link: "/aboutus",
    icons: <Users size={18}/>,
  },
];

export const formSearchItems = [
  {
    name: "patientName",
    typeinput: "text",
  },
  {
    name: "modality",
    typeinput: "text",
  },
  {
    name: "From_date",
    typeinput: "date",
  },
  {
    name: "To_date",
    typeinput: "date",
  },
];

export const inforCard = [
  {
    title: "Number of patients:",
    iconsvg: PatientIcon,
    linkValue: "/admin/patients",
    bg_color: "bg-blue-200",
    content: "0",
  },
  {
    title: "Number of users:",
    iconsvg: usersIcon,
    linkValue: "/admin/usermanagement",
    bg_color: "bg-red-200",
    content: "0",
  },
  {
    title: "size:",
    iconsvg: sizefilesIcon,
    linkValue: "/admin/studies",
    bg_color: "bg-green-200",
    content: "0",
  },
  {
    title: "Number of studies:",
    iconsvg: studiesIcon,
    linkValue: "/admin/studies",
    bg_color: "bg-yellow-200",
    content: "0",
  },
];
import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import serverList from "../../pages/serverList/ServerList";
export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "serverList",
    path: "/serverList",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  }
];
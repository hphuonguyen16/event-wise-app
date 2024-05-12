import React from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CelebrationIcon from "@mui/icons-material/Celebration";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Link from "next/link";

const CustomSidebar = () => {
  const pathname = usePathname();

  // Function to determine if the link is active
  const isActive = (href) => pathname.includes(href);

  return (
    <div className="flex flex-col items-center w-16 h-full overflow-hidden text-gray-700 bg-gray-100 rounded p-10 justify-between">
      <div className="flex items-center justify-center mt-3" href="#">
        <CelebrationIcon sx={{ fontSize: "40px" }} />
      </div>
      <div
        className="flex flex-col items-center mt-3 border-t border-gray-300"
        style={{ margin: "auto 0" }}
      >
        <Link href="/home">
          <div
            className={`flex items-center justify-center w-12 h-12 mt-2 rounded ${
              isActive("/home") ? "bg-white" : "hover:bg-white"
            }`}
            href="#"
          >
            <DashboardOutlinedIcon
              sx={{ fontSize: "32px", stroke: "#ffffff", strokeWidth: 1 }}
            />
          </div>
        </Link>
        <Link href="/manage/event">
          <div
            className={`flex items-center justify-center w-12 h-12 mt-2 rounded ${
              isActive("/manage/event") ? "bg-white" : "hover:bg-white"
            }`}
            href="#"
          >
            <DateRangeOutlinedIcon
              sx={{ fontSize: "30px", stroke: "#ffffff", strokeWidth: 1 }}
            />
          </div>
        </Link>
        <Link href="/manage/order">
          <div
            className={`flex items-center justify-center w-12 h-12 mt-2 rounded ${
              isActive("/manage/order") ? "bg-white" : "hover:bg-white"
            }`}
            href="#"
          >
            <AssignmentOutlinedIcon
              sx={{ fontSize: "30px", stroke: "#ffffff", strokeWidth: 1 }}
            />
          </div>
        </Link>
        <Link href="/organization">
          <div
            className={`flex items-center justify-center w-12 h-12 mt-2 rounded ${
              isActive("/organization") ? "bg-white" : "hover:bg-white"
            }`}
            href="#"
          >
            <SettingsOutlinedIcon
              sx={{ fontSize: "30px", stroke: "#ffffff", strokeWidth: 1 }}
            />
          </div>
        </Link>
      </div>
      <div
        className="flex items-center justify-center w-16 h-16 mt-auto bg-gray-200 rounded hover:bg-white"
        href="#"
      >
        <LogoutOutlinedIcon
          sx={{ fontSize: "30px", stroke: "#ffffff", strokeWidth: 1 }}
        />
      </div>
    </div>
  );
};

export default CustomSidebar;

import React from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CelebrationIcon from "@mui/icons-material/Celebration";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Tooltip } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Link from "next/link";
import { menuOrganizer } from "../menu";

const CustomSidebar = ({ menuItems }) => {
  const pathname = usePathname();

  // Function to determine if the link is active
  const isActive = (href) => pathname.includes(href);

  return (
    <div className="flex flex-col items-center w-16 h-full overflow-hidden text-gray-700 bg-gray-100 rounded p-10 justify-between">
      <div className="flex items-center justify-center mt-3" href="#">
        <CelebrationIcon sx={{ fontSize: "40px" }} />
      </div>
      <div
        className="flex flex-col items-center border-t border-gray-300"
        style={{ margin: "auto 0" }}
      >
        {menuItems.map((menuItem, index) => (
          <Link key={index} href={menuItem.link}>
            <Tooltip title={menuItem.name} placement="right-start" arrow>
              <div
                className={`flex items-center justify-center w-12 h-12 mt-2 rounded ${
                  isActive(menuItem.link) ? "bg-white" : "hover:bg-white"
                }`}
              >
                {menuItem.icon}
              </div>
            </Tooltip>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CustomSidebar;

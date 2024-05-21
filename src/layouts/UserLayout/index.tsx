// @mui
"use client";
import { styled } from "@mui/material/styles";
import { Poppins } from "next/font/google";
//
import React, { PropsWithChildren, ReactNode } from "react";
import useResponsive from "@/hooks/useResponsive";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Avatar, Button, IconButton, Stack } from "@mui/material";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SearchTextbox from "../SearchTextbox/SearchTextbox";
import ProfilePopover from "../ProfilePopover";
import { menuUser } from "../menu";
import { useAuth } from "@/context/AuthContext";
import CustomSidebar from "../Sidebar";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")(({ theme }) => ({
  display: "flex",
  // height: "100vh",
  // overflow: "auto",
  maxHeight: "100vh",
  width: "100%", // Set width to 100% by default
  backgroundColor: "white",

  [theme.breakpoints.down("sm")]: {
    // Media query for screens with a width of 600px or less (mobile)
    width: "100%", // Set width to 100% for mobile screens
  },
}));

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  maxHeight: "100vh",
  width: "100%",
  // overflow: 'auto',
  paddingBottom: "20px",
  [theme.breakpoints.down("sm")]: {
    // Media query for screens with a width of 600px or less (mobile)
    marginLeft: "0",
    flexGrow: 1,
    // Remove left margin for mobile
  },
}));

const HeaderBar = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginRight: "25px",
  alignItems: "center",
  padding: theme.spacing(3),

  [theme.breakpoints.down("sm")]: {
    // Media query for screens with a width of 600px or less (mobile)
    flexDirection: "column", // Change to a column layout for mobile
    alignItems: "flex-start", // Adjust alignment for mobile
    padding: theme.spacing(1), // Adjust padding for mobile
    marginRight: 0, // Remove right margin for mobile
    width: "100%",
  },
}));

// ----------------------------------------------------------------------

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useResponsive("down", "sm");
  const {user} = useAuth()

  return (
    <StyledRoot>
      <aside style={{ backgroundColor: "#fcfff5" }}>
        {user && user.role === "user" && <CustomSidebar menuItems={menuUser} />}
        
      </aside>
      <Main className={poppins.variable}>
        <HeaderBar>
          <SearchTextbox />
          <ProfilePopover></ProfilePopover>
        </HeaderBar>
        {children}
      </Main>
    </StyledRoot>
  );
};

export default Layout;

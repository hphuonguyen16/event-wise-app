// @mui
"use client";
import { styled } from "@mui/material/styles";
import { Poppins } from "next/font/google";
//
import React, {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from "react";
import useResponsive from "@/hooks/useResponsive";
import CustomSidebar from "./Sidebar";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Avatar, Button, Fab, IconButton, Stack, Tooltip } from "@mui/material";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SearchTextbox from "./SearchTextbox/SearchTextbox";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ProfilePopover from "./ProfilePopover";
import Recharge from "./Recharge/Recharge";
import { useAuth } from "@/context/AuthContext";
import { menuAdmin, menuOrganizer } from "./menu";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
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
  minHeight: "100vh",
  width: "100%",
  overflow: 'auto',
  marginLeft: "20px",
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
  const [openRecharge, setOpenRecharge] = useState(false);
  const { user } = useAuth();
  console.log(user?.role);

  return (
    user && (
      <StyledRoot>
        <aside style={{ backgroundColor: "#fcfff5" }}>
          {user.role === "admin" && <CustomSidebar menuItems={menuAdmin} />}
          {user.role === "organizer" && (
            <CustomSidebar menuItems={menuOrganizer} />
          )}
        </aside>
        <Main className={poppins.variable}>
          {openRecharge && (
            <Recharge
              openRecharge={openRecharge}
              setOpenRecharge={setOpenRecharge}
            />
          )}
          <HeaderBar>
            <SearchTextbox />
            <Stack direction="row" alignItems={"center"} spacing={2}>
              <Tooltip title="Deposit" arrow>
                <Fab
                  size="small"
                  aria-label="recharge"
                  onClick={() => setOpenRecharge(true)}
                >
                  <AttachMoneyIcon />
                </Fab>
              </Tooltip>
              <ProfilePopover />
            </Stack>
          </HeaderBar>
          {children}
        </Main>
      </StyledRoot>
    )
  );
};

export default Layout;

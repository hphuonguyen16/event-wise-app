/* eslint-disable react-hooks/exhaustive-deps */
// @mui
"use client";

import {
  Typography,
  Avatar,
  Box,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Button,
  Stack,
  Card,
  Paper,
  Slide,
  Menu,
} from "@mui/material";
import {
  LockResetOutlined,
  Logout,
  PersonOutline,
  SensorOccupiedOutlined,
  ArrowBackIosNew,
  GTranslate,
  AccountCircle,
  ArrowForwardIos,
  Settings,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";

// hooks
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import BackupTableOutlinedIcon from "@mui/icons-material/BackupTableOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

// utils
// import ImageEncode from "@/common/utils/ImageEncode";

// components
import Link from "next/link";

// configs
import UrlConfig from "@/config/urlConfig";
import { useAuth } from "@/context/AuthContext";

//----------------------------------------------------------------

const StyledIconBox = styled("div")(({ theme }) => ({
  width: "55px",
  height: "55px",
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.light,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  ":hover": { scale: "105%" },
  // border: "2px white solid",
  "& svg": {
    fontSize: "24px",
    color: "white",
  },
  boxShadow: "-7px 10px 21px 1px rgba(204.44, 128.17, 240.32, 0.30)",
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  width: "100%",
  borderRadius: "6px",
  margin: "2px 0",
  padding: "10px 15px",
  minWidth: "220px",
}));

const LANGS = [
  {
    value: "vi",
    label: "Vietnamese",
    icon: "/icons/ic_flag_vi.svg",
  },
  {
    value: "en",
    label: "English",
    icon: "/icons/ic_flag_en.svg",
  },
];

//----------------------------------------------------------------

const ProfilePopover = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<any>(null);

  const containerRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const signOutFn = () => {
    localStorage.clear();
    router.push("/login");
  };

  const [parent, setParent] = useState(null);

  const handleSlideToChild = (parent: any) => () => {
    setParent(parent);
  };
  const handleSlideToParent = () => {
    setParent(null);
  };

  const handleLangClick = async (lang: any) => {
    // await setLanguage(lang)
  };
  return (
    <div>
      <Button
        sx={{
          // ...(open && { backgroundColor: (theme) => `${alpha(theme.palette.primary.main, 0.8)} !important`, }),
          transition: "all 0.15s ease-in-out",
        }}
        onClick={handleClick}
      >
        <StyledIconBox>
          <Person2RoundedIcon />
        </StyledIconBox>
      </Button>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          "& .MuiList-root": {
            // height: parent ? "150px" : "295px",
            overflow: "hidden",
            transition: "0.2s all ease-in-out",
          },
          "& .MuiMenu-paper": {
            "@media (-webkit-device-pixel-ratio: 1.25)": {
              left: "1500px !important",
            },
          },
        }}
      >
        <Paper sx={{ display: "flex" }} ref={containerRef}>
          <Slide
            direction="left"
            in={!!parent}
            appear={false}
            container={containerRef.current}
          >
            <Paper sx={{ position: "absolute", width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: "10px",
                }}
              >
                <IconButton
                  onClick={handleSlideToParent}
                  sx={{
                    display: "block",
                    padding: "0 10px",
                    marginRight: "5px",
                  }}
                >
                  <ArrowBackIosNew sx={{ fontSize: " 15px" }} />
                </IconButton>
                <ListItemText sx={{ marginTop: "6.5px" }}>
                  Language
                </ListItemText>
              </Box>
              <Stack sx={{ p: "8px" }}>
                {LANGS.map((option) => (
                  <StyledMenuItem
                    key={option.value}
                    // selected={option.value === lang}
                    onClick={() => handleLangClick(option.value)}
                  >
                    <Box
                      component="img"
                      alt={option.label}
                      src={option.icon}
                      sx={{ width: 28, mr: 2 }}
                    />
                    <ListItemText>{option.label}</ListItemText>
                  </StyledMenuItem>
                ))}
              </Stack>
            </Paper>
          </Slide>
          <Slide
            direction="right"
            in={!parent}
            appear={false}
            container={containerRef.current}
          >
            <Paper>
              <StyledMenuItem sx={{ pointerEvents: "none" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "5px",
                  }}
                >
                  <Avatar src={user?.profile.avatar} alt="photoURL" />
                  <Box sx={{ ml: 1.5 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "text.primary",
                        lineHeight: "1",
                        marginRight: "10px",
                      }}
                    >
                      {user?.profile.name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "text.primary",
                        lineHeight: "1",
                        marginRight: "10px",
                        marginTop: "10px",
                      }}
                    >
                      {user?.balance.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Typography>
                  </Box>
                </Box>
              </StyledMenuItem>

              <Divider sx={{ m: "0 !important" }} />

              {user && user.role === "user" && (
                <Stack sx={{ p: "8px" }}>
                  <Link href="/me/profile">
                    <StyledMenuItem onClick={() => handleClose()}>
                      <ListItemIcon sx={{ alignItems: "center" }}>
                        <AccountCircle fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>My Profile</ListItemText>
                    </StyledMenuItem>
                  </Link>
                  <Link href="/me/manage-order">
                    <StyledMenuItem onClick={() => handleClose()}>
                      <ListItemIcon sx={{ alignItems: "center" }}>
                        <AssignmentOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>My Orders</ListItemText>
                    </StyledMenuItem>
                  </Link>
                  <Link href="/settings">
                    <StyledMenuItem onClick={handleClose}>
                      <ListItemIcon sx={{ alignItems: "center" }}>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Settings</ListItemText>
                    </StyledMenuItem>
                  </Link>
                </Stack>
              )}

              {user && user.role === "organizer" && (
                <Stack sx={{ p: "8px" }}>
                  <Link href="/me/profile">
                    <StyledMenuItem onClick={() => handleClose()}>
                      <ListItemIcon sx={{ alignItems: "center" }}>
                        <AccountCircle fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>My Profile</ListItemText>
                    </StyledMenuItem>
                  </Link>
                  <Link href="/manage/event">
                    <StyledMenuItem onClick={() => handleClose()}>
                      <ListItemIcon sx={{ alignItems: "center" }}>
                        <DateRangeOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Manage Event</ListItemText>
                    </StyledMenuItem>
                  </Link>
                  <Link href="/manage/order">
                    <StyledMenuItem onClick={handleClose}>
                      <ListItemIcon sx={{ alignItems: "center" }}>
                        <AssignmentOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Manage Order</ListItemText>
                    </StyledMenuItem>
                  </Link>
                  <Link href="/organization">
                    <StyledMenuItem onClick={handleClose}>
                      <ListItemIcon sx={{ alignItems: "center" }}>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Organization Settings</ListItemText>
                    </StyledMenuItem>
                  </Link>
                </Stack>
              )}

              {user && user.role === "admin" && (
                <Stack sx={{ p: "8px" }}>
                  <Link href="/me/profile">
                    <StyledMenuItem onClick={() => handleClose()}>
                      <ListItemIcon sx={{ alignItems: "center" }}>
                        <AccountCircle fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>My Profile</ListItemText>
                    </StyledMenuItem>
                  </Link>
                  <Link href="/admin/manage/event">
                    <StyledMenuItem onClick={() => handleClose()}>
                      <ListItemIcon sx={{ alignItems: "center" }}>
                        <DateRangeOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Manage Event</ListItemText>
                    </StyledMenuItem>
                  </Link>
                  <Link href="/admin/manage/category">
                    <StyledMenuItem onClick={handleClose}>
                      <ListItemIcon sx={{ alignItems: "center" }}>
                        <BackupTableOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Manage Category</ListItemText>
                    </StyledMenuItem>
                  </Link>
                  <Link href="/admin/manage/user">
                    <StyledMenuItem onClick={handleClose}>
                      <ListItemIcon sx={{ alignItems: "center" }}>
                        <AccountCircleOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Manage User</ListItemText>
                    </StyledMenuItem>
                  </Link>
                </Stack>
              )}

              <Divider sx={{ m: "0px 0" }} />

              <Stack sx={{ p: "8px" }}>
                <StyledMenuItem onClick={signOutFn}>
                  <ListItemIcon sx={{ color: "#FF4842" }}>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ "& span": { color: "#FF4842 !important" } }}
                  >
                    Signout
                  </ListItemText>
                </StyledMenuItem>
              </Stack>
            </Paper>
          </Slide>
        </Paper>
      </Menu>
    </div>
  );
};

export default ProfilePopover;

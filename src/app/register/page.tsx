/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
// @mui
import { styled } from "@mui/material/styles";
import {
  Link,
  Container,
  Typography,
  Stack,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import { LogoDev } from "@mui/icons-material";
import { GiTreeBeehive } from "react-icons/gi";
import { GiBeehive } from "react-icons/gi";

// hooks
import useResponsive from "@/hooks/useResponsive";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useRouter } from "next/navigation";

// auth
// components
import Image from "next/image";

// assets
import LoginBanner from "@/assets/login_banner.jpg";
import { useAuth } from "@/context/AuthContext";
import urlConfig from "@/config/urlConfig";
import Snackbar from "@/components/common/Snackbar";
import useSnackbar from "@/context/snackbarContext";
import Loader from "@/components/common/Loader/Loader";
import { User } from "@/types/user";
import logoMobile from "@/assets/logoMobile.png";

//----------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
    width: "70%",
    height: "80%",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: theme.shadows[18],
    borderRadius: 12,
  },
  [theme.breakpoints.down("md")]: {
    height: "100vh",
  },
}));

const StyledBanner = styled("div")(({ theme }) => ({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderTopLeftRadius: 12,
  borderBottomLeftRadius: 12,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: "90%",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  [theme.breakpoints.down("md")]: {
    width: "85%",
    maxWidth: 420,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(10, 0),
    alignItems: "center",
  },
}));

//----------------------------------------------------------------

export default function LoginPage() {
  const { setIsAuthenticated, setAccessToken, setUser, accessToken } =
    useAuth();
  const pathname = usePathname();
  const isMobile = useResponsive("down", "md");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { setSnack } = useSnackbar();
  const mdUp = useResponsive("up", "md");
  const [isPersonal, setIsPersonal] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "user",
  });

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const handleSignup = async () => {
    setIsLoggingIn(true);
    const res = await fetch(urlConfig.user.signup, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
      // // credentials: "include", // Add this option
    });
    const resJson = await res.json();
    if (resJson.status === "success") {
      // redirect to '/'
      const user = resJson.data.user as User;
      setIsAuthenticated(true);
      setAccessToken(resJson.token);
      setUser(user);
      //set local storage
      // localStorage.setItem("persist", "persist");
      // localStorage.setItem("role", user.role);
      // localStorage.setItem("accessToken", resJson.token);
      setSnack({ open: true, type: "success", message: "" });
      router.push("/login");
    } else {
      setIsLoggingIn(false);
      setSnack({ open: true, type: "error", message: resJson.message });
    }
  };

  return (
    <>
      <Snackbar />
      <title> Signup | EventWise </title>
      <StyledRoot>
        {mdUp && (
          <StyledBanner>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <Image
                style={{
                  objectFit: "cover",
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 12,
                }}
                fill
                src={LoginBanner}
                alt="login"
              />
            </Box>
          </StyledBanner>
        )}

        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: "#fff",
            margin: 0,
            minWidth: "50%",
            width: "auto",
            height: "100%",
            zIndex: 10,
            borderTopRightRadius: "12px",
            borderBottomRightRadius: "12px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <StyledContent>
            <Image
              src={logoMobile}
              alt="logo"
              width={38}
              style={{ margin: "0" }}
            />
            <Typography variant="h4" gutterBottom className="mt-8 mb-6">
              Sign up to EventWise
            </Typography>
            <Grid container spacing={1} className="w-full">
              <Grid item xs={12} md={6}>
                <TextField
                  name="name"
                  label="Name"
                  fullWidth
                  className="mt-6"
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="email"
                  label="Email"
                  fullWidth
                  className="mt-6"
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  className="mt-3"
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  name="confirm-password"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  className="mt-3"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      passwordConfirm: e.target.value,
                    });
                  }}
                />
              </Grid>
            </Grid>
            <Box sx={{ marginY: "20px" }}>
              <Button
                variant={formData.role === "user" ? "contained" : "outlined"}
                // disabled={formData.role === "organizer"}
                onClick={() => setFormData({ ...formData, role: "user" })}
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  borderRadius: "12px",
                  "&:disabled": {
                    // border: '2px solid rgb(155 99 191 / 63%)', background: '#e7afe01f',
                    "& .MuiTypography-h5": {
                      color: (theme) => theme.palette.common.white,
                    },
                    "& .MuiTypography-subtitle2": {
                      color: (theme) => theme.palette.grey[100],
                    },
                  },
                }}
              >
                <Stack
                  direction={"row"}
                  alignItems="center"
                  justifyContent="start"
                  sx={{ width: "100%" }}
                >
                  <Box
                    sx={{
                      fontSize: "28px",
                      background: (theme) =>
                        isPersonal
                          ? theme.palette.common.white
                          : theme.palette.secondary.main,
                      color: (theme) =>
                        isPersonal
                          ? theme.palette.secondary.main
                          : theme.palette.common.white,
                      padding: "10px 10px",
                      margin: "10px 5px",
                      borderRadius: "12px",
                    }}
                  >
                    <GiTreeBeehive />
                  </Box>
                  <Box sx={{ marginLeft: "15px" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        textAlign: "left",
                        lineHeight: 1.25,
                        marginBottom: "5px",
                      }}
                    >
                      Personal
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ textTransform: "initial" }}
                    >
                      Find and join events
                    </Typography>
                  </Box>
                </Stack>
              </Button>
              <Button
                variant={
                  formData.role === "organizer" ? "contained" : "outlined"
                }
                // disabled={formData.role === "user"}
                onClick={() => setFormData({ ...formData, role: "organizer" })}
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  borderRadius: "12px",
                  "&:disabled": {
                    // border: '2px solid rgb(155 99 191 / 63%)', background: '#e7afe01f',
                    "& .MuiTypography-h5": {
                      color: (theme) => theme.palette.common.white,
                    },
                    "& .MuiTypography-subtitle2": {
                      color: (theme) => theme.palette.grey[100],
                    },
                  },
                }}
              >
                <Stack
                  direction={"row"}
                  alignItems="center"
                  justifyContent="start"
                  sx={{ width: "100%" }}
                >
                  <Box
                    sx={{
                      fontSize: "28px",
                      background: (theme) =>
                        !isPersonal
                          ? theme.palette.common.white
                          : theme.palette.secondary.main,
                      color: (theme) =>
                        !isPersonal
                          ? theme.palette.secondary.main
                          : theme.palette.common.white,
                      padding: "10px 10px",
                      margin: "10px 5px",
                      borderRadius: "12px",
                    }}
                  >
                    <GiBeehive />
                  </Box>
                  <Box sx={{ marginLeft: "15px" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        textAlign: "left",
                        lineHeight: 1.25,
                        marginBottom: "5px",
                      }}
                    >
                      Organizer
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ textTransform: "initial" }}
                    >
                      Start creating your own events
                    </Typography>
                  </Box>
                </Stack>
              </Button>
            </Box>

            <LoadingButton
              loading={isLoggingIn}
              onClick={() => handleSignup()}
              variant="contained"
              color="primary"
              sx={{ width: "100%", mt: 1, mb: 2, height: 50 }}
            >
              Sign up
            </LoadingButton>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
//}

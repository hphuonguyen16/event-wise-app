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
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import { LogoDev } from "@mui/icons-material";

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
    width: "80%",
    maxWidth: 420,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(10, 0),
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
  const { setIsAuthenticated, setAccessToken, setUser, accessToken } = useAuth();
  const pathname = usePathname();
  const isMobile = useResponsive("down", "md");
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { setSnack } = useSnackbar();
  const mdUp = useResponsive("up", "md");

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const handleLogin = async () => {
    setIsLoggingIn(true);
    const res = await fetch(urlConfig.user.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
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
      console.log(resJson.token);
      localStorage.setItem("persist", "persist");
      localStorage.setItem("role", user.role);
      localStorage.setItem("accessToken", resJson.token);
      if (user.role === "admin") {
        router.push("/admin/manage/event");
      } else if (user.role === "organizer") {
        router.push("/manage/event");
      } else {
        router.push("/home");
      }
    } else {
      setIsLoggingIn(false);
      setSnack({ open: true, type: "error", message: resJson.message });
    }
  };


  return (
    <>
      <Snackbar />
      <title> Login | EventWise </title>
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
              Sign in to EventWise
            </Typography>
            <Stack spacing={3} className="w-full">
              <TextField
                name="email"
                label="Email"
                className="mt-6"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />

              <TextField
                name="password"
                label="Password"
                type="password"
                className="mt-3"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
              />
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2, width: "100%" }}
            >
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember me"
              />
              <Link
                variant="subtitle2"
                underline="hover"
                style={{ cursor: "pointer" }}
                onClick={() => router.push("/forgot-password")}
              >
                Forgot password?
              </Link>
            </Stack>
            <LoadingButton
              loading={isLoggingIn}
              onClick={() => handleLogin()}
              
              variant="contained"
              color="primary"
              sx={{ width: "100%", mt: 3, mb: 2, height: 50}}
            >
              Sign in
            </LoadingButton>
            <Typography
              variant="body2"
              sx={{ mt: 1, mb: 8, width: "100%" }}
              textAlign={"right"}
            >
              Don’t have an account yet?{" "}
              <Link variant="body2" href="/register">
                Get started
              </Link>
            </Typography>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
//}

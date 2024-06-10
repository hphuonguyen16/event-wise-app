"use client";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  Avatar,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useState, useEffect } from "react";
import UploadAvatar from "./UploadAvatar";
import dayjs from "dayjs";
import axios from "axios";
import UrlConfig from "@/config/urlConfig";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useSnackbar from "@/context/snackbarContext";
import CustomSnackbar from "@/components/common/Snackbar";
import { set } from "lodash";
import { type } from "os";

const uploadImage = async (file) => {
  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    // formData.append('public_id', 'testttt@gmail.com1');
    formData.append(
      "upload_preset",
      `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
    );
    return await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url !== "") {
          const uploadedFileUrl = data.secure_url;
          return uploadedFileUrl;
        }
      })
      .catch((err) => console.error(err));
  }
};
const Profile = () => {
  const axiosPrivate = useAxiosPrivate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [information, setInformation] = useState({
    email: "",
    name: "",
    avatar: "",
    role: "",
    bio: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    avatar: null,
    role: "",
    bio: "",
  });
  const { setSnack } = useSnackbar();
  const fetchData = async () => {
    const response = await axiosPrivate.get(UrlConfig.me.getMe);
    const data = response.data.data;
    setInformation(data);
    setFormData({
      email: data.email,
      name: data.profile.name,
      avatar: data.profile.avatar,
      role: data.role,
      bio: data.profile.bio,
    });
  };
  console.log(formData);
  const updateData = async () => {
    if (information.name === "" || information.email === "") {
      setSnack({
        open: true,
        message: "Please fill in all the fields",
        type: "error",
      });
    }
    const avatar = await uploadImage(formData.avatar);
    await axiosPrivate
      .put(UrlConfig.me.updateProfile, {
        ...formData,
        avatar: avatar,
      })
      .then((res) => {
        if (res.data.status === "Success") {
          setSnack({
            open: true,
            message: "Update profile successfully",
            type: "success",
          });
        }
      })
      .catch((err) => {
        setSnack({
          open: true,
          message: "Update profile failed",
          type: "error",
        });
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    formData.role && (
      <div style={{ width: "100%", maxHeight: "93vh", overflow: "auto" }}>
        <CustomSnackbar />
        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
            margin: "20px 100px",
            backgroundColor: "transparent",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  py: 10,
                  px: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <UploadAvatar
                  file={information.avatar}
                  formData={formData}
                  setFormData={setFormData}
                  information={information}
                  setInformation={setInformation}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3, height: "100%" }}>
                <Box sx={{ display: "block", width: "100%" }}>
                  <Typography
                    variant="h4"
                    component="h4"
                    sx={{ margin: "1.5rem" }}
                  >
                    Change Profile
                  </Typography>
                  <Box component="form" noValidate autoComplete="off">
                    <Box
                      sx={{
                        "& .MuiTextField-root": { m: 2, width: "45%" },
                      }}
                    >
                      <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Name"
                        defaultValue={information.profile.name}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          });
                        }}
                      />
                      <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Email"
                        defaultValue={information.email}
                        disabled
                      />
                    </Box>

                    <Box
                      sx={{
                        "& .MuiTextField-root": { m: 2, width: "93%" },
                      }}
                    >
                      <TextField
                        required
                        id="outlined-required"
                        label="Bio"
                        defaultValue={information.profile.bio}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            bio: e.target.value,
                          });
                        }}
                      />
                    </Box>
                  </Box>
                  <Stack
                    spacing={1}
                    direction="row"
                    alignItems="center"
                    justifyContent={"flex-end"}
                    sx={{
                      mt: 3,
                      marginRight: "2rem",
                    }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={updateData}
                      sx={{
                        width: "150px",
                      }}
                    >
                      Save
                    </Button>
                  </Stack>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Card>
      </div>
    )
  );
};

export default Profile;

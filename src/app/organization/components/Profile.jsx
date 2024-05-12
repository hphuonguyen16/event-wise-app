import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
//import ImageCropper from "@/components/ImageCropper";
import LinkIcon from "@mui/icons-material/Link";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import UrlConfig from "@/config/urlConfig";
import he from "he";
import useSnackbar from "@/context/snackbarContext";
import CustomSnackbar from "@/components/common/Snackbar";
import ImageCropper from "@/components/common/ImageCropper";
import { IconButton, Stack } from "@mui/material";
import { Delete } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";

function Profile() {
  const axiosPrivate = useAxiosPrivate();
  const { setSnack } = useSnackbar();
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dataForm, setDataForm] = useState({
    name: "",
    website: "",
    bio: "",
    social: {
      facebook: "",
      twitter: "",
    },
    avatar: "",
  });
  const [cropper, setCropper] = useState(null);
  const getNewAvatar = (e) => {
    if (e.target.files) {
      setEditMode(true);
      setDataForm({
        ...dataForm,
        avatar: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const getCropData = async () => {
    if (cropper) {
      const file = await fetch(cropper.getCroppedCanvas().toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
          return new File([blob], "avatar.png", { type: "image/png" });
        });
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
    }
  };
  async function fetchProfile() {
    try {
      setIsLoading(true);
      const res = await axiosPrivate.get(UrlConfig.me.getMe);
      const dataRes = res.data.data;
      console.log(dataRes);
      setDataForm((prev) => ({
        ...prev,
        name: dataRes.name,
        website: dataRes.website,
        bio: dataRes.bio,
        social: {
          facebook: dataRes.social?.facebook,
          twitter: dataRes.social?.twitter,
        },
        avatar: dataRes.avatar,
      }));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(dataForm);
  async function handleSave() {
    try {
      setIsSubmitting(true);
      var avatar = await getCropData();
      const res = await axiosPrivate.put(UrlConfig.me.updateProfile, {
        name: dataForm.name,
        website: dataForm.website,
        bio: dataForm.bio,
        social: {
          facebook: dataForm.social.facebook,
          twitter: dataForm.social.twitter,
        },
        avatar: avatar,
      });
      if (res.data.status === "Success") {
        setEditMode(false);
        setSnack({
          open: true,
          message: "Organizer profile updated successfully!",
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
      setSnack({
        open: true,
        message:
          error.response?.data?.message ||
          "Failed to update profile! Please try again later.",
        type: "error",
      });
    }
    setIsSubmitting(false);
  }
  useEffect(() => {
    const fetchData = async () => {
      await fetchProfile();
    };
    fetchData();
  }, []);

  return (
    !isLoading && (
      <Box sx={{ width: "80%" }}>
        <CustomSnackbar />
        <Box>
          <Typography variant="h4">Organizer profile image</Typography>
          <Typography variant="subtitle1">
            This is the first image attendees will see at the top of your
            profile. Use a high quality square image.
          </Typography>
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{ position: "relative", marginTop: "20px" }}
          >
            {!editMode && (
              <img
                src={dataForm.avatar}
                alt="avatar"
                className="w-[450px] h-[450px] rounded-lg"
              />
            )}
            {editMode ? (
              <ImageCropper
                cancelEdit={() => setEditMode(false)}
                avatarUrl={dataForm.avatar}
                setCropper={setCropper}
              />
            ) : (
              // <input
              //   type="file"
              //   accept="image/png, image/jpeg, image/jpg"
              //   onChange={getNewAvatarUrl}
              //   className="mt-2 border border-solid border-black py-2 px-4 rounded cursor-pointer h-[300px] w-[300px] before:content-['Upload image']"
              // />

              <div className="flex w-full mt-6">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-white hover:bg-white dark:border-gray-200 dark:hover:border-gray-100 dark:hover:bg-gray-100"
                >
                  <div
                    className="flex flex-col items-center justify-center pt-5 pb-6"
                    style={{ position: "absolute", left: "8%" }}
                  >
                    <svg
                      className="w-8 h-8 mb-4 text-violet-800 dark:text-violet-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-violet-800 dark:text-violet-600">
                      <span className="font-semibold">Click to upload</span> or
                      just skip for now
                    </p>
                    <p className="text-xs text-violet-800 dark:text-violet-600">
                      SVG, PNG, JPG or GIF
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={getNewAvatar}
                    className="hidden"
                  />
                  {/* <input id="dropzone-file" type="file" class="hidden" /> */}
                </label>
              </div>
            )}
            {editMode && (
              <Stack direction={"column"} sx={{ ml: 2 }} spacing={1}>
                {/* <IconButton><Edit /></IconButton> */}
                <IconButton
                  onClick={() => {
                    setEditMode(false);
                    setCropper(null);
                  }}
                >
                  <Delete />
                </IconButton>
              </Stack>
            )}
          </Stack>
        </Box>
        <Box sx={{ marginTop: "40px" }}>
          <Box>
            <Typography variant="h4">About the organizer</Typography>
            <Typography variant="subtitle1">
              Let attendees know who is hosting events
            </Typography>

            <TextField
              required
              variant="outlined"
              label="Organizer name"
              //   value={dataFormAdd.description}
              sx={{ width: "60%", marginTop: "20px" }}
              value={dataForm.name}
              onChange={(e) => {
                setDataForm({ ...dataForm, name: e.target.value });
              }}
            />
            <TextField
              variant="outlined"
              label="Your website"
              sx={{ width: "60%", marginTop: "20px" }}
              value={dataForm.website}
              onChange={(e) => {
                setDataForm({ ...dataForm, website: e.target.value });
              }}
            />
          </Box>
        </Box>
        <Box sx={{ marginTop: "40px" }}>
          <Typography variant="h6">Organizer Bio</Typography>
          <Typography variant="subtitle1">
            Describe who you are, the types of events you host, or your mission.
            The bio is displayed on your organizer profile. Unfortunately, we
            can no longer support images, video, or custom HTML in the
            description.
          </Typography>
          <Box style={{ height: "300px", marginTop: "20px", width: "100%" }}>
            <ReactQuill
              theme="snow"
              value={dataForm.bio ? he.decode(dataForm.bio) : dataForm.bio}
              onChange={(value) => setDataForm({ ...dataForm, bio: value })}
              className="editor-input"
            />
          </Box>
        </Box>
        <Box sx={{ marginTop: "80px" }}>
          <Typography variant="h4">Social media and marketing</Typography>
          <Typography variant="subtitle1">
            Let attendees know how to connect with you
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Facebook"
            value={dataForm.social.facebook}
            onChange={(e) => {
              setDataForm({
                ...dataForm,
                social: { ...dataForm.social, facebook: e.target.value },
              });
            }}
            sx={{ width: "60%", marginTop: "20px" }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Twitter"
            value={dataForm.social.twitter}
            onChange={(e) => {
              setDataForm({
                ...dataForm,
                social: { ...dataForm.social, twitter: e.target.value },
              });
            }}
            sx={{ width: "60%", marginTop: "20px" }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            sx={{ marginTop: "20px" }}
            onClick={() => {
              handleSave();
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress
                size={15}
                sx={{
                  color: (theme) => theme.palette.secondary.dark,
                  margin: "5px 20px",
                }}
              />
            ) : (
              "Save"
            )}
          </Button>
        </Box>
      </Box>
    )
  );
}

export default Profile;

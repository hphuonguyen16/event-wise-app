/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Typography,
  Box,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  TextField,
  TextareaAutosize,
  Button,
} from "@mui/material";
import styled from "styled-components";
import Image from "next/image";
import { BiBox } from "react-icons/bi";
import { FileUploadRounded } from "@mui/icons-material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import CollectionsIcon from "@mui/icons-material/Collections";
import EventDescription from "./EventDescription";
import { useEffect, useState } from "react";
import Autocomplete from "./Autocomplete";
import { Anybody } from "next/font/google";
import dayjs from "dayjs";
import ImageSlider from "@/components/ImageSlider";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import urlConfig from "@/config/urlConfig";
import useSnackbar from '@/context/snackbarContext'
import CustomSnackbar from "@/components/common/Snackbar";

async function handleFileUpload(files: File[]) {
  //@ts-ignore
  const uploadPromises = files.map((file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
    );

    return fetch(
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
      .catch((err) => {
        return err;
      });
  });
  const uploadedUrls = await Promise.all(uploadPromises);
  return uploadedUrls;
}

export default function Page() {
  const [eventForm, setEventForm] = useState({
    images: [],
    title: "",
    summary: "",
    date: null,
    startTime: null,
    endTime: null,
    location: null,
    detailLocation: "",
    about: [
      {
        description: null,
        type: "text",
      },
    ],
  });

  console.log(eventForm);
  const { setSnack } = useSnackbar()

const axiosPrivate = useAxiosPrivate();

  const handleAddDescriptionText = (e: any) => {
    const newDescription = [...eventForm.about];
    newDescription.push({
      description: null,
      type: "text",
    });
    setEventForm({ ...eventForm, about: newDescription });
  };

  const handleImageChangeAbout = (e: any) => {
    const files = e.target.files[0]
    console.log(files)
    const newDescription = [...eventForm.about];
    newDescription.push({
      description: files,
      type: "image",
    });
    setEventForm({ ...eventForm, about: newDescription });
  };

  const handleImageChange = (e: any) => {
    const files = e.target.files;
    console.log(files);
    if (files && files.length > 0 && eventForm.images.length <= 5) {
      const newImages = [...eventForm.images];
      var pushLength = files.length;
      if (pushLength + eventForm.images.length > 5)
        pushLength = 5 - eventForm.images.length;
      for (let i = 0; i < pushLength; i++) {
        //@ts-ignore
        newImages.push(files[i]);
      }
      setEventForm({ ...eventForm, images: newImages });
    }
  };

  const handleDeleteImages = (indexToRemove: number) => {
    setEventForm((prevForm) => ({
      ...prevForm,
      images: prevForm.images.filter(
        (item: any, index: number) => index !== indexToRemove
      ),
    }));
  };

  const handleDeleteAbout = (indexToRemove: number) => {
    setEventForm((prevForm) => ({
      ...prevForm,
      about: prevForm.about.filter(
        (item: any, index: number) => index !== indexToRemove
      ),
    }));
  };

  const addEventApi = async () => {
    if (eventForm.title === "" || eventForm.summary === "" || eventForm.date === null || eventForm.location === null) {
      setSnack({
        open: true,
        message: "Please fill in all the required fields!",
        type: "error",
      });
      return;
    }
    const urlImages = await handleFileUpload(eventForm.images);
    const aboutAfterUpload = await Promise.all(
      eventForm.about.map(async (item) => {
        if (item.type === "image") {
          //@ts-ignore
          const url = await handleFileUpload([item.description]);
          return {
            description: url[0],
            type: "image",
          };
        } else {
          return item;
        }
      })
    );
    const response = await axiosPrivate.post(urlConfig.event.createEvent, {
      images: urlImages,
      title: eventForm.title,
      summary: eventForm.summary,
      location: eventForm.location,
      //@ts-ignore
      date: eventForm.date.toDate().toDateString().split("T")[0],
      //@ts-ignore
      startTime: eventForm.startTime.format("HH:mm"),
      //@ts-ignore
      endTime: eventForm.endTime.format("HH:mm"),
      detailLocation: eventForm.detailLocation,
      about: aboutAfterUpload,
    });
    if (response.data.status === "success") {
      setSnack({
        open: true,
        message: "Event created successfully!",
        type: "success",
      });
    } else {
      setSnack({
        open: true,
        message: "Something went wrong! Please try again!",
        type: "error",
      });
    }
  };


  if (eventForm.startTime) {
  //@ts-ignore
  const formattedStartTime = eventForm.startTime.format("HH:mm");
  console.log(formattedStartTime);
} else {
  console.log("startTime is null or undefined");
}
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", paddingBottom: "20px" }}
    >
      <CustomSnackbar />
      <Box sx={{ width: "60%" }}>
        <Box>
          <Typography variant="h3">Build your event page</Typography>
          <Typography variant="h4" sx={{ marginTop: "20px" }}>
            Add all of your event details and let attendees know what to expect
          </Typography>
        </Box>
        <Box>
          <Card
            sx={{
              marginTop: "20px",
              border: "1px solid #ccc",
              padding: "20px",
            }}
          >
            <Typography variant="h4" sx={{ marginBottom: "60px" }}>
              Add your event images
            </Typography>
            {eventForm.images.length > 0 ? (
              <ImageSlider
                images={eventForm.images}
                handleDeleteImages={handleDeleteImages}
              />
            ) : (
              <Box
                sx={{
                  height: "450px",
                  position: "relative",
                }}
              >
                <img
                  src="https://www.hollywoodreporter.com/wp-content/uploads/2023/10/TSErasTour2-H-2023.jpg?w=1296"
                  alt="event"
                  style={{
                    width: "100%",
                    height: "450px",
                    borderRadius: "10px",
                    opacity: "0.6",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    width: "170px",
                    height: "170px",
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    borderRadius: "10px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <>
                    <input
                      accept="image/*, video/*"
                      type="file"
                      id="event-upload"
                      className="hidden"
                      multiple
                      onChange={handleImageChange}
                    />
                    <label htmlFor="event-upload">
                      <IconButton
                        sx={{ marginBottom: "10px" }}
                        component="span"
                      >
                        <FileUploadRounded />
                      </IconButton>
                    </label>
                  </>
                  <Typography>Upload photos</Typography>
                </Box>
              </Box>
            )}
            <Box sx={{ marginTop: "20px" }}>
              <input
                accept="image/*, video/*"
                type="file"
                id="icon-button-file"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
              <label htmlFor="icon-button-file">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CollectionsIcon />}
                >
                  Add Image
                </Button>
              </label>
            </Box>
          </Card>
          <Card sx={{ marginTop: "20px", border: "1px solid #ccc" }}>
            <Typography variant="h4" sx={{ padding: "20px" }}>
              Event Overview
            </Typography>
            <CardContent>
              <Box>
                <Typography variant="h5" sx={{ marginBottom: "25px" }}>
                  Event Title
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: "25px" }}>
                  Be clear and descriptive with a title that tells people what
                  your event is about.
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Event Title"
                  variant="outlined"
                  sx={{ width: "90%" }}
                  required
                  value={eventForm.title}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, title: e.target.value })
                  }
                />
              </Box>
              <Box sx={{ marginTop: "35px" }}>
                <Typography variant="h5" sx={{ marginBottom: "25px" }}>
                  Summary
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: "25px" }}>
                  Grab people attention with a short description about your
                  event. Attendees will see this at the top of your event page.
                  (140 characters max)
                </Typography>
                <TextField
                  id="outlined-multiline-flexible"
                  placeholder="Details about the event"
                  multiline
                  required
                  maxRows={20}
                  sx={{ width: "90%" }}
                  inputProps={{
                    style: {
                      height: "100px",
                    },
                  }}
                  value={eventForm.summary}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, summary: e.target.value })
                  }
                />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ marginTop: "20px", border: "1px solid #ccc" }}>
            <Typography variant="h4" sx={{ padding: "20px" }}>
              Date and location
            </Typography>
            <CardContent>
              <Box>
                <Typography variant="h5" sx={{ marginBottom: "25px" }}>
                  Date and time 
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        value={eventForm.date || null}
                        onChange={(newValue) => {
                          //@ts-ignore
                          setEventForm({ ...eventForm, date: newValue });
                        }}
                        label="Date"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <TimePicker
                    value={eventForm.startTime}
                    onChange={(newValue) =>
                      //@ts-ignore
                      setEventForm({ ...eventForm, startTime: newValue })
                    }
                    label="Start Time"
                  />
                  <TimePicker
                    value={eventForm.endTime}
                    onChange={(newValue) =>
                      //@ts-ignore
                      setEventForm({ ...eventForm, endTime: newValue })
                    }
                    label="End Time"
                  />
                </Box>
              </Box>
              <Box sx={{ marginTop: "35px" }}>
                {/* Your location-related JSX */}
                <Typography variant="h5" sx={{ marginBottom: "25px" }}>
                  Location
                </Typography>
                <Autocomplete
                  selectedData={eventForm.location}
                  setSelectedData={setEventForm}
                />
                <Typography
                  variant="h5"
                  sx={{ marginBottom: "25px", marginTop: "25px" }}
                >
                  Location detail
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Location detail"
                  variant="outlined"
                  sx={{ width: "90%" }}
                  value={eventForm.detailLocation}
                  onChange={(e) => {
                    setEventForm({
                      ...eventForm,
                      detailLocation: e.target.value,
                    });
                  }}
                />
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ marginTop: "20px", border: "1px solid #ccc" }}>
            <Typography variant="h4" sx={{ padding: "20px" }}>
              About this event
            </Typography>
            <CardContent>
              <Box>
                <Typography variant="body1" sx={{ marginBottom: "25px" }}>
                  Add more details about your event and include what people can
                  expect if they attend.
                </Typography>
                {eventForm.about.map((item, index) => {
                  return (
                    <EventDescription
                      key={index}
                      type={item.type}
                      description={item.description}
                      OnChangeDescription={(description: any) => {
                        const newDescription = [...eventForm.about];
                        newDescription[index].description = description;
                        setEventForm({ ...eventForm, about: newDescription });
                      }}
                      handleDeleteAbout={() => {
                        handleDeleteAbout(index);
                      }}
                    />
                  );
                })}
              </Box>
              <Box sx={{ marginTop: "70px" }}>
                <Button
                  variant="outlined"
                  sx={{ marginRight: "15px" }}
                  onClick={handleAddDescriptionText}
                >
                  Add Text
                </Button>
                <>
                  <input
                    accept="image/*, video/*"
                    type="file"
                    id="icon-buttons-file"
                    className="hidden"
                    onChange={handleImageChangeAbout}
                  />
                  <label htmlFor="icon-buttons-file">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<CollectionsIcon />}
                    >
                      Add Image
                    </Button>
                  </label>
                </>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            sx={{ marginTop: "20px" }}
            onClick={() => {
              addEventApi();
            }}
          >
            Create Event
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

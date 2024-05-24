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

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import urlConfig from "@/config/urlConfig";
import useSnackbar from "@/context/snackbarContext";
import EventCreate from "@/components/Events/EventCreate";
import { convertStringTimeToDateJS } from "@/utils/DateConvert";
import he from "he";
import { useRouter } from "next/navigation";

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

export default function Page({ params }: { params: { id: string } }) {
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
  const { setSnack } = useSnackbar();
  const router = useRouter();

  const axiosPrivate = useAxiosPrivate();
  const handleSave = async () => {
    if (
      eventForm.title === "" ||
      eventForm.summary === "" ||
      eventForm.date === null ||
      eventForm.location === null
    ) {
      setSnack({
        open: true,
        message: "Please fill in all the required fields!",
        type: "error",
      });
      return;
    }
      //check date greater than today
      //@ts-ignore
    if (eventForm.date.isBefore(dayjs())) {
      setSnack({
        open: true,
        message: "Please select a date that is greater than today!",
        type: "error",
      });
      return;
    }

    //check start time less than end time
    //@ts-ignore
    if (eventForm.startTime.isAfter(eventForm.endTime)) {
      setSnack({
        open: true,
        message: "Please select a start time that is less than end time!",
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
    const response = await axiosPrivate.put(urlConfig.event.updateEvent(params.id), {
      images: urlImages,
      title: eventForm.title,
      summary: eventForm.summary,
      location: eventForm.location,
      //@ts-ignore
      date: eventForm.date,
      //@ts-ignore
      startTime: eventForm.startTime,
      //@ts-ignore
      endTime: eventForm.endTime,
      detailLocation: eventForm.detailLocation,
      about: aboutAfterUpload,
    });
    if (response.data.status === "success") {
      setSnack({
        open: true,
        message: "Event updated successfully!",
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

  const fetchDetailEvent = async () => {
    const response = await axiosPrivate.get(
      urlConfig.event.getEvent(params.id)
    );
    if (response.data.status === "success") {
      const event = response.data.data.data;
      setEventForm({
        images: event.images,
        title: event.title,
        summary: event.summary,
        //@ts-ignore
        date: dayjs(event.date),
        //@ts-ignore
        startTime: dayjs(event.startTime),
        //@ts-ignore
        endTime: dayjs(event.endTime),
        location: event.location,
        detailLocation: event.detailLocation,
        about: event.about,
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      await fetchDetailEvent();
    }
    fetchData();
  }, []);


  return (
    <>
      {eventForm.title && (
        <Box>
          <EventCreate
            eventForm={eventForm}
            setEventForm={setEventForm}
            handleSave={handleSave}
          />
        </Box>
      )}
    </>
  );
}

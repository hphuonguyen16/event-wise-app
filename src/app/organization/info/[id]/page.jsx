'use client'
import React from "react";
import axiosPrivate from "@/hooks/useAxiosPrivate";
import UrlConfig from "@/config/urlConfig";
import { useEffect, useState } from "react";

import { Box } from "@mui/material";
import Profile from "./components/Profile";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import { Grid } from "@mui/material";
import EventCard from "@/components/Events/EventCard";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import moment from "moment";

function chunk(array, size) {
  return array?.reduce((chunks, item, index) => {
    if (index % size === 0) {
      chunks.push([item]);
    } else {
      chunks[chunks.length - 1].push(item);
    }
    return chunks;
  }, []);
}

function Page({ params }) {
  const { id } = params;
  const [profileInfo, setProfileInfo] = React.useState();
  const [events, setEvents] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const axiosPrivate = useAxiosPrivate();
  async function fetchProfile() {
    try {
      setIsLoading(true);
      const res = await axiosPrivate.get(UrlConfig.me.getProfileById(id));
      const dataRes = res.data.data;
      console.log(dataRes);
      setProfileInfo(dataRes);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchEvents() {
    try {
      const res = await axiosPrivate.get(
        `${UrlConfig?.event.getAllEvents}&user=${id}`
      );
      const dataRes = res.data.data.data.map((event) => {
        return (
          {
          _id: event._id,
          title: event.title,
          date: moment(event.date).format("ddd MMM DD YYYY"),
          startTime: moment(event.startTime).format("HH:mm"),
          images: event.images,
          location: event.location,
        });
      })
      console.log(dataRes);
      setEvents(dataRes);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchProfile();
      await fetchEvents();
    };
    fetchData();
  }, []);

  const eventChunks = chunk(events, 4);
  return (
    <Box sx={{paddingBottom:'50px'}}>
      {!isLoading && <Profile profileInfo={profileInfo} />}
      <Box sx={{ marginTop: "100px",width: "80%", margin:"auto" }}>
        <Typography variant="h3" sx={{ mt: 5 }}>
          {" "}
          Events{" "}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 2, padding: "10px" }}>
          <Button variant="contained" color="secondary">
            Upcoming Events
          </Button>
          <Button variant="outlined" color="secondary">
            Past Events
          </Button>
        </Stack>
        {eventChunks?.map((chunk, rowIndex) => (
          <Grid container spacing={1} key={rowIndex} sx={{ mt: 2 }}>
            {chunk.map((event, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <EventCard event={event} organizerName={profileInfo?.name} />
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>
    </Box>
  );
}

export default Page;

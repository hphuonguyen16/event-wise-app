"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useState } from "react";
import UrlConfig from "@/config/urlConfig";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import EventCard from "@/components/Events/EventCard";
import ProfileCard from "@/components/Organization/ProfileCard";

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

function Page() {
  const searchParams = useSearchParams();
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState([]);
  const router = useRouter();
  async function fetchSearchData() {
    const res = await axiosPrivate.get(
      `${UrlConfig.search.searchEvents}?q=${searchParams.get("q")}`
    );
    setData(res.data.data);
  }
  useEffect(() => {
    const fetchData = async () => {
      //await fetchCategories();
      await fetchSearchData();
    };
    fetchData();
  }, []);
  const eventSearch = chunk(data.events, 4);
  const organizerSearch = chunk(data.organizers, 4);

  return (
    <div>
      <Box sx={{ marginTop: "100px", width: "100%", margin: "auto" }}>
        <Typography variant="h3" sx={{ mt: 5 }}>
          {" "}
          Events{" "}
        </Typography>

        {eventSearch?.map((chunk, rowIndex) => (
          <Grid container spacing={1} key={rowIndex} sx={{ mt: 2 }}>
            {chunk.map((event, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <EventCard
                  event={event}
                  organizerName={event?.user?.profile?.name}
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>
      <Box sx={{ marginTop: "100px", margin: "auto" }}>
        <Typography variant="h3" sx={{ mt: 5 }}>
          {" "}
          Organizers{" "}
        </Typography>

        {organizerSearch?.map((chunk, rowIndex) => (
          <Grid container spacing={1} key={rowIndex} sx={{ mt: 2 }}>
            {organizerSearch.map((o, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <ProfileCard profile={o} />
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>
    </div>
  );
}

export default Page;

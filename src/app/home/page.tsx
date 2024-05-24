"use client";
import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import CategoryTag from "./components/CategoryTag";
import UrlConfig from "@/config/urlConfig";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import moment from "moment";
import EventCard from "@/components/Events/EventCard";

function HomePage() {
  const axiosPrivate = useAxiosPrivate();
  const [categories, setCategories] = useState<any[]>([]);
  const [events, setEvents] = useState<any>();

  async function fetchEventsByCategory() {
    try {
      const fetchedEvents: { [key: string]: any[] } = {};
      const res = await axiosPrivate.get(
        UrlConfig.category.getPopularCategories
      );
      const categories = res.data.data;
      const categoryIds = categories
        .map((category: any) => category._id)
        .slice(0, 4);

      await Promise.all(
        categoryIds.map(async (categoryId: string) => {
          const res = await axiosPrivate.get(
            `${UrlConfig?.event.getAllEvents}?category=${categoryId}&limit=4`
          );
          const dataRes = res.data.data.data.map((event: any) => ({
            _id: event._id,
            title: event.title,
            date: moment(event.date).format("ddd MMM DD YYYY"),
            startTime: moment(event.startTime).format("HH:mm"),
            images: event.images,
            location: event.location,
          }));
          if (dataRes.length > 0) {
            const category = categories.find(
              (category: any) => category._id === categoryId
            );
            fetchedEvents[category.name] = dataRes;
          }
        })
      );
      setCategories(categories);
      setEvents(fetchedEvents);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchEventsByCategory();
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <img
          src="https://cdn.evbstatic.com/s3-build/fe/build/images/9662fa598ddd4e8f78fd87196067cfd3-homepage_banner_nightlife_1067x470.webp"
          alt="image"
          style={{ width: "100%", objectFit: "cover" }}
        />
      </Box>
      <Box sx={{ margin: "40px auto", width: "80%" }}>
        <Stack direction={"row"} alignItems={"center"} spacing={7}>
          <CategoryTag />
          <CategoryTag />
          <CategoryTag />
          <CategoryTag />
          <CategoryTag />
          <CategoryTag />
          <CategoryTag />
          <CategoryTag />
        </Stack>
        {events &&
          Object.keys(events).map((category: string) => (
            <Box key={category} sx={{ mt: 5 }}>
              <Typography variant="h3">{category}</Typography>
              <Stack
                direction="row"
                spacing={2}
                sx={{ mt: 2, padding: "10px" }}
              >
                {events[category].map((event: any) => (
                  /* @ts-ignore */
                  <EventCard key={event._id} event={event} />
                ))}
              </Stack>
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default HomePage;

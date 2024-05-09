"use client";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import EventDetailSlider from "./EventDetailSlider";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import UrlConfig from "@/config/urlConfig";
import he from "he";
import { formatTime, formatOnlyDate } from "@/utils/DateConvert";

const EventDetail = ({ params }: { params: { id: string } }) => {
  const axiosPrivate = useAxiosPrivate();
  const images = [
    "https://www.hollywoodreporter.com/wp-content/uploads/2023/10/TSErasTour2-H-2023.jpg?w=1296",
  ];
  const [eventDetail, setEventDetail] = React.useState({} as any);
  React.useEffect(() => {
    axiosPrivate.get(UrlConfig.event.getEvent(params.id)).then((res) => {
      setEventDetail(res.data.data.data);
    });
  }, []);
  console.log(eventDetail);
  return (
    <Box sx={{ width: "85%", margin: "auto", paddingBottom: "30px" }}>
      <EventDetailSlider images={eventDetail.images} />
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "73%", paddingRight: "40px" }}>
          <Box>
            <Typography variant="h2">{eventDetail.title}</Typography>
          </Box>
          <Box sx={{ marginTop: "40px" }}>{eventDetail.summary}</Box>

          <Box sx={{ marginTop: "40px" }}>
            <Typography variant="h3">Location</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <LocationOnRoundedIcon
                sx={{ fontSize: "30px", marginRight: "20px" }}
              />
              <Box>
                <Typography sx={{ fontWeight: "bold", marginTop: "15px" }}>
                  {eventDetail.location?.formatted}
                </Typography>
                <Typography>{eventDetail.detailLocation}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ marginTop: "40px" }}>
            <Typography variant="h3">Time</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <AccessTimeFilledRoundedIcon
                sx={{ fontSize: "30px", marginRight: "20px" }}
              />
              <Box>
                <Typography sx={{ fontWeight: "bold", marginTop: "15px" }}>
                  {formatOnlyDate(eventDetail.date)}
                </Typography>
                {eventDetail.startDate && eventDetail.endDate ? (
                  <Typography>
                    {formatTime(eventDetail.startDate)} to {formatTime(eventDetail.endDate)}
                  </Typography>
                ) : (
                  <Typography>All day</Typography>
                )}
              </Box>
            </Box>
          </Box>
          <Box sx={{ marginTop: "40px" }}>
            <Typography variant="h3">About this event</Typography>
            {eventDetail.about?.map((item: any, i: number) =>
              item.type === "text" ? (
                <Box key={i} sx={{ marginTop: "30px" }}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: he.decode(item.description),
                    }}
                  />
                </Box>
              ) : (
                <Box key={i} sx={{ marginTop: "30px" }}>
                  <img
                    src={item.description}
                    alt="event"
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      maxHeight: "500px",
                    }}
                  />
                </Box>
              )
            )}
          </Box>
        </Box>
        <Box sx={{ width: "27%", padding: "20px" }}>
          <Box
            sx={{
              border: "1px solid #ccc",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <Typography variant="h4">$20</Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "20px", height: "50px" }}
              fullWidth
            >
              Tickets
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EventDetail;

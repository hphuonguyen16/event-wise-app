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
import { Grid } from "@mui/material";
import TicketCard from "@/components/Tickets/TicketCard";
import Modal from "@mui/material/Modal";
import useResponsive from "@/hooks/useResponsive";

const EventDetail = ({ params }: { params: { id: string } }) => {
  const axiosPrivate = useAxiosPrivate();
  const [openTicket, setOpenTicket] = React.useState(false);
  const images = [
    "https://www.hollywoodreporter.com/wp-content/uploads/2023/10/TSErasTour2-H-2023.jpg?w=1296",
  ];
  const [eventDetail, setEventDetail] = React.useState({} as any);
  const isMobile = useResponsive("down", "sm");
  React.useEffect(() => {
    axiosPrivate.get(UrlConfig.event.getEvent(params.id)).then((res) => {
      setEventDetail(res.data.data.data);
    });
  }, []);
  return (
    <Box sx={{ width: "70%", margin: "auto", paddingBottom: "30px" }}>
      <EventDetailSlider images={eventDetail.images} />
      <Grid container spacing={2}>
        {/* Left column */}
        <Grid item xs={12} sm={8}>
          <Box sx={{ paddingRight: "40px" }}>
            <Box>
              <Typography variant="h2">{eventDetail.title}</Typography>
            </Box>
            <Box sx={{ marginTop: "40px" }}>{eventDetail.summary}</Box>

            <Box sx={{ marginTop: "40px" }}>
              <Typography variant="h4">Location</Typography>
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
              <Typography variant="h4">Time</Typography>
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
                      {formatTime(eventDetail.startDate)} to{" "}
                      {formatTime(eventDetail.endDate)}
                    </Typography>
                  ) : (
                    <Typography>All day</Typography>
                  )}
                </Box>
              </Box>
            </Box>
            <Box sx={{ marginTop: "40px" }}>
              <Typography variant="h4">About this event</Typography>
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
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                )
              )}
            </Box>
          </Box>
        </Grid>
        {/* Right column */}
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              border: "1px solid #ccc",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 20px",
              borderRadius: "10px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "20px", height: "50px" }}
              fullWidth
              onClick={() => setOpenTicket(true)}
            >
              Get Tickets
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Modal open={openTicket} onClose={() => setOpenTicket(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            //   width: isMobile ? '80vw' : width ? width : '100vw',
            width: isMobile ? "90%" : "80%",
            height: isMobile ? "90%" : "83%",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            padding: isMobile ? 3 : "20px",
          }}
        >
          <TicketCard />
        </Box>
      </Modal>
    </Box>
  );
};

export default EventDetail;

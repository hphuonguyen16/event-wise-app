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
import TicketCard from "@/components/Tickets/TicketCardList";
import Modal from "@mui/material/Modal";
import useResponsive from "@/hooks/useResponsive";
import CustomSnackbar from "@/components/common/Snackbar";
import useSnackbar from "@/context/snackbarContext";

const EventDetail = ({ params }) => {
  const axiosPrivate = useAxiosPrivate();
  const { setSnack } = useSnackbar();
  const [openTicket, setOpenTicket] = React.useState(false);
  const [tickets, setTickets] = React.useState([]);
  const [isUpdated, setIsUpdated] = React.useState(false);
  const images = [
    "https://www.hollywoodreporter.com/wp-content/uploads/2023/10/TSErasTour2-H-2023.jpg?w=1296",
  ];
  const [eventDetail, setEventDetail] = React.useState({});
  const isMobile = useResponsive("down", "sm");

  const handleSave = async (event, dataFormAdd) => {
    event.preventDefault();
    try {
      const orders = dataFormAdd.filter(
        (order) =>
          order.quantity !== null &&
          order.quantity != 0 &&
          order.quantity !== ""
      );
      const response = await axiosPrivate.post(UrlConfig.order.createOrder, {
        event: params.id,
        orders: orders.map((order) => ({
          ticketType: order.id,
          quantity: order.quantity,
        })),
        orderType: "online",
        status: "completed",
      });

      if (response.data.status === "success") {
        setSnack({
          open: true,
          message: "Order created successfully!",
          type: "success",
        });
        setIsUpdated(!isUpdated);
        setOpenTicket(false);
      } else {
        setSnack({
          open: true,
          message: "Something went wrong! Please try again!",
          type: "error",
        });
      }
    } catch (error) {
      setSnack({
        open: true,
        message:
          error.response?.data?.message ||
          "Something went wrong! Please try again!",
        type: "error",
      });
    }
  };

  React.useEffect(() => {
    axiosPrivate.get(UrlConfig.event.getEvent(params.id)).then((res) => {
      setEventDetail(res.data.data.data);
    });
    // axiosPrivate
    //   .get(UrlConfig?.ticketType.getTicketTypesByEventId(params.id))
    //   .then((res) => {
    //     setTickets(res.data.data);
    //   });
  }, []);

  React.useEffect(() => {
    axiosPrivate
      .get(UrlConfig?.ticketType.getTicketTypesByEventId(params.id))
      .then((res) => {
        setTickets(res.data.data);
      });
  }, [isUpdated]);
  return (
    <Box sx={{ width: "70%", margin: "auto", paddingBottom: "30px" }}>
      <CustomSnackbar />
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
              {eventDetail.about?.map((item, i) =>
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
            overflow: "auto",
          }}
        >
          <TicketCard tickets={tickets} handleSave={handleSave} />
        </Box>
      </Modal>
    </Box>
  );
};

export default EventDetail;

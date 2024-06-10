import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Import the desired icon
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"; // Import the desired icon
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { formatTime, formatOnlyDate } from "@/utils/DateConvert";

const PreviewCard = ({ event }: any) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: "100%",
        background: "white",
        padding: "10px 10px 20px 10px",
        borderRadius: "20px",
      }}
    >
      <Grid item md={4}>
        <img
          src={event?.images?.[0]}
          alt="event"
          style={{ width: "100%", borderRadius: "10px" }}
        />
      </Grid>
      <Grid item md={8}>
        <Typography sx={{ fontWeight: "bold" }}>{event?.title}</Typography>
        <Typography
          sx={{ fontWeight: "bold", fontSize: "12px", marginTop: "10px" }}
        >
          {formatOnlyDate(event.date)}
        </Typography>
        <Typography variant="subtitle2" sx={{ marginTop: "10px" }}>
          {event.location?.formatted}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          justifyContent={"space-between"}
          sx={{ marginTop: "30px" }}
        >
          <Stack direction="row" alignItems="flex-end" spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <AccessTimeIcon sx={{ fontSize: "12px" }} />
              {event.startDate && event.endDate ? (
                <Typography>
                  {formatTime(event.startTime)} to {formatTime(event.endTime)}
                </Typography>
              ) : (
                <Typography>All day</Typography>
              )}
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography sx={{ fontWeight: "bold", fontSize: "12px" }}>
              Preview
            </Typography>
            <OpenInNewIcon sx={{ fontSize: "12px" }} />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default PreviewCard;

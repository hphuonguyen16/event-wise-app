import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Import the desired icon
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"; // Import the desired icon
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const PreviewCard = () => {
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
          src="https://www.hollywoodreporter.com/wp-content/uploads/2023/10/TSErasTour2-H-2023.jpg?w=1296"
          alt="event"
          style={{ width: "100%", borderRadius: "10px" }}
        />
      </Grid>
      <Grid item md={8}>
        <Typography sx={{ fontWeight: "bold" }}>Mung Hi De hehe</Typography>
        <Typography sx={{ fontWeight: "bold", fontSize: "12px", marginTop:'10px' }}>
          Monday, May 27 · 10am - 12pm GMT+7{" "}
        </Typography>
        <Typography variant="subtitle2" sx={{marginTop:'10px'}}>Hội An, Hội An, Quảng Nam</Typography>
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
              <Typography sx={{ fontWeight: "bold", fontSize: "12px" }}>
                Fr2.00—Fr10.00
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <PeopleAltIcon sx={{ fontSize: "12px" }} />
              <Typography sx={{ fontWeight: "bold", fontSize: "12px" }}>
                25
              </Typography>
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

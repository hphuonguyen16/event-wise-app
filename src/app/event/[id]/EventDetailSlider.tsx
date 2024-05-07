import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Box } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton } from "@mui/material";

interface EventDetailSliderProps {
  images: Array<any>;
}

function EventDetailSlider({ images }: EventDetailSliderProps) {
  // Destructure props
  return (
    <Carousel>
      {images?.map((image, i) => (
        <Box
          sx={{
            height: "500px",
          }}
          key={i}
        >
          <img
            src={image}
            alt="event"
            style={{
              width: "100%",
              height: "450px",
              borderRadius: "10px",
            }}
          />
        </Box>
      ))}
    </Carousel>
  );
}

export default EventDetailSlider; // Export ImageSlider component

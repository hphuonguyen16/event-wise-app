import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Box } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton } from "@mui/material";
import theme from "../theme";

interface ImageSliderProps {
    images: Array<any>;
    handleDeleteImages: (index: number) => void;
}

function ImageSlider({ images, handleDeleteImages }: ImageSliderProps) {
  // Destructure props
  return (
    <Carousel>
      {images.map((image, i) => (
        <Box
          sx={{
            height: "450px",
            position: "relative",
          }}
          key={i}
        >
          <img
            src={typeof image === "string" ? image : URL.createObjectURL(image)}
            alt="event"
            style={{
              width: "100%",
              height: "450px",
              borderRadius: "10px",
            }}
          />
          <IconButton
            sx={{
              position: "absolute",
              top: "6%",
              right: "5%",
              backgroundColor: (theme) =>
                `${theme.palette.common.white}aa !important`,
              zIndex: 3,
              "&:hover": {
                backgroundColor: (theme) =>
                  `${theme.palette.common.white}!important`,
              },
            }}
            onClick={() => handleDeleteImages(i)}
          >
            <CloseRoundedIcon sx={{ color: "black", fontSize: "21px" }} />
          </IconButton>
        </Box>
      ))}
    </Carousel>
  );
}


export default ImageSlider; // Export ImageSlider component

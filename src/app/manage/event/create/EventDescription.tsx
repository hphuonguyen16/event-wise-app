import React from 'react'
import { useState } from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import "react-quill/dist/quill.snow.css";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


interface EventDescriptionProps {
  type: string
  description: any
  OnChangeDescription: (description: any) => void
  handleDeleteAbout : () => void
}

const EventDescription = ({
  type,
  description,
  OnChangeDescription,
  handleDeleteAbout
}: EventDescriptionProps) => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box style={{ height: "300px", marginTop: "60px", width: "100%" }}>
        {type === "text" ? (
          <ReactQuill
            theme="snow"
            value={description}
            onChange={(value) => OnChangeDescription(value)}
            className="editor-input"
          />
        ) : (
          <img
            src={URL.createObjectURL(description)}
            alt="event"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "10px",
            }}
          />
        )}
      </Box>
      <IconButton
        onClick={() => {
          handleDeleteAbout();
        }}
      >
        <DeleteRoundedIcon />
      </IconButton>
    </Box>
  );
};

export default EventDescription
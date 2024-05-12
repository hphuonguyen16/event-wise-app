import React from "react";
import { Box } from "@mui/material";
import NightlifeRoundedIcon from "@mui/icons-material/NightlifeRounded";


const CategoryTag = () => {
  return (
    <div
      className="iconCategoryCard"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        className="iconCategoryCardImageWrapper group hover:bg-dee5ff transition duration-300 ease-in-out cursor-pointer"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "107px",
          width: "107px",
          borderRadius: "50%",
          background: "#fff",
          marginBottom: "10px",
            border: "1px solid #dee5ff",
            stroke: "white",
            strokeWidth: "1px",
        }}
      >
        <NightlifeRoundedIcon sx={{ fontSize: "37px" }} />
      </div>
          <p className="iconCategoryCardTitle eds-text-weight--heavy">Business</p>
          
    </div>
  );
};

export default CategoryTag;

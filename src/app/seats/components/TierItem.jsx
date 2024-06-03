import React from "react";
import { useState } from "react";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { useMapObjectContext } from "@/context/MapObjectContext";

const colors = [
  "#FF6961", // Pastel Red
  "#FFB347", // Pastel Orange
  "#FFFB77", // Pastel Yellow
  "#77DD77", // Pastel Green
  "#AEC6CF", // Pastel Blue
  "#CBAACB", // Pastel Purple
  "#FFD1DC", // Pastel Pink
  "#FFDAB9", // Pastel Peach
  "#C1E1C1", // Pastel Mint
  "#E6E6FA", // Pastel Lavender
  "#B2EBF2", // Pastel Cyan
  "#F49AC2", // Pastel Magenta
  //   "#99C5C4", // Pastel Teal
  //   "#FFB3AB", // Pastel Coral
  //   "#D4A4E0", // Pastel Lilac
];

const TierItem = ({ data, setTiers }) => {
  const [backgroundColor, setBackgroundColor] = useState(colors);
  const [editColor, setEditColor] = useState(false);
  const { mapData, setMapData, selectedSeats, setSelectedSeats } =
    useMapObjectContext();
  const [tier, setTier] = useState(data);
  function changeColor(color) {
    setTier({ ...tier, color: color });
    setTiers((prev) =>
      prev.map((item) =>
        item.id === tier.id ? { ...item, color: color } : item
      )
    );
  }
  function handleEditColor(e) {
    setEditColor(!editColor);
  }
  console.log("tier", tier);

  const handleAssignSeats = (e) => {
    const updatedMapData = { ...mapData };

    selectedSeats.forEach((selectedSeat) => {
      if (selectedSeat.type === "section") {
        updatedMapData.sections = updatedMapData.sections.map((section) => {
          if (section.id === selectedSeat.sectionId) {
            section.subsections.forEach((subsection) => {
              for (let row in subsection.seats_by_rows) {
                const seats = subsection.seats_by_rows[row];
                const seatIndex = seats.findIndex(
                  (seat) => seat.name === selectedSeat.name
                );
                if (seatIndex !== -1) {
                  seats[seatIndex].tier = data; // Ensure selectedSeat.tier is defined
                }
              }
            });
          }
          return section;
        });
      } else if (selectedSeat.type === "table") {
        updatedMapData.tables = updatedMapData.tables.map((table) => {
          if (table.id === selectedSeat.tableId) {
            table.seatsInfo.forEach((seat) => {
              if (seat.name === selectedSeat.name) {
                seat.tier = data; // Ensure selectedSeat.tier is defined
              }
            });
          }
          return table;
        });
      }
    });

    setMapData(updatedMapData);
    setSelectedSeats([]); // Clear selected seats
  };

  console.log("selectedSeats", selectedSeats);
  console.log("mapData", mapData);


  function handleChangeTier(name, value) {
    setTier({ ...tier, [name]: value });
    setTiers((prev) =>
      prev.map((item) =>
        item.id === tier.id ? { ...item, [name]: value } : item
      )
    );
  }

  const isAssigned = selectedSeats.length > 0;
  return (
    <Box
      sx={{
        background: "white",
        color: "black",
        padding: "20px 10px",
        borderRadius: "10px",
      }}
    >
      <Stack direction="row" justifyContent={"space-between"}>
        <Stack direction="row" spacing={2}>
          <IconButton
            sx={{
              background: tier.color,
              padding: "15px",
            }}
            onClick={isAssigned ? handleAssignSeats : handleEditColor}
          >
            <EditOutlinedIcon />
          </IconButton>
          <Box sx={{ marginLeft: "20px" }}>
            <TextField
              value={tier.name}
              variant="standard"
              sx={{ width: "40%" }}
              onChange={(e) => handleChangeTier("name", e.target.value)}
            />
            <Typography variant="subtitle2">{data.seats} seats</Typography>
          </Box>
        </Stack>
        <IconButton>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Stack>
      {editColor && (
        <Grid container spacing={2} sx={{ marginTop: "30px" }}>
          {colors.map((color) => (
            <Grid item md={3} key={color}>
              <Box
                sx={{
                  width: 45,
                  height: 45,
                  borderRadius: "50%",
                  backgroundColor: color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => changeColor(color)}
              >
                {tier.color === color && (
                  <DoneRoundedIcon sx={{ color: "white" }} />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TierItem;

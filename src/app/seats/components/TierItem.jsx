import React from "react";
import { useState, useCallback, useEffect } from "react";
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
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import UrlConfig from "@/config/urlConfig";
import _ from "lodash";
import { colors } from "@/constants/colors";

const TierItem = ({ data, setTiers, tiers, handleDelete }) => {
  const [editColor, setEditColor] = useState(false);
  const { mapData, setMapData, selectedSeats, setSelectedSeats } =
    useMapObjectContext();
  const [tier, setTier] = useState(data);
  const axiosPrivate = useAxiosPrivate();
  function changeColor(color) {
    setTier({ ...tier, color: color });
    setTiers((prev) =>
      prev.map((item) =>
        item._id === tier._id ? { ...item, color: color } : item
      )
    );
  }
  const handleUpdate = async (id, updatedTier) => {
    try {
      const response = await axiosPrivate.put(
        UrlConfig.tier.updateTier(id),
        updatedTier
      );

      if (response.data.status === "success") {
        const updatedTiers = tiers.map((tier) =>
          tier._id === id ? updatedTier : tier
        );
        setTiers(updatedTiers);
      }
    } catch (error) {
      console.log(error);
    }
  };
  function handleEditColor(e) {
    setEditColor(!editColor);
  }
  console.log("tier", tier);

  const handleAssignSeats = (e) => {
    const updatedMapData = { ...mapData };

    selectedSeats.forEach((selectedSeat) => {
      if (selectedSeat.type === "section") {
        updatedMapData.sections = updatedMapData.sections.map((section) => {
          if (section._id === selectedSeat.sectionId) {
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
          if (table._id === selectedSeat.sectionId) {
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

  function handleChangeTier(name, value) {
    setTier({ ...tier, [name]: value });
    setTiers((prev) =>
      prev.map((item) =>
        item._id === tier._id ? { ...item, [name]: value } : item
      )
    );
  }

  const debouncedUpdate = useCallback(
    _.debounce((id, updatedTier) => {
      handleUpdate(id, updatedTier);
    }, 1000),
    []
  );

  useEffect(() => {
    if (tier._id) {
      debouncedUpdate(tier._id, tier);
    }
  }, [tier, debouncedUpdate]);

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
              maxLength={20}
            />
            <Typography variant="subtitle2">{data.seats} seats</Typography>
          </Box>
        </Stack>
        <IconButton
          onClick={handleDelete}
          sx={{
            padding: "10px",
          }}
        >
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

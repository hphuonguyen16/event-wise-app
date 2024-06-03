import { Typography, Box, Divider, Stack, Button } from "@mui/material";
import React from "react";
import TierItem from "./TierItem";

const tierItems = [
  {
    name: "Tier 1",
    seats: 10,
    id: Math.random().toString(36).substr(2, 9),
    color: "#FFFB77",
  },
  {
    name: "Tier 2",
    seats: 20,
    id: Math.random().toString(36).substr(2, 9),
    color: "#FF6961",
  },
];

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

const TierCard = () => {
  const [tiers, setTiers] = React.useState(tierItems);
 function addTier(e) {
   const usedColors = tiers.map((tier) => tier.color);

   const availableColors = colors.filter(
     (color) => !usedColors.includes(color)
   );

   const randomColor =
     availableColors[Math.floor(Math.random() * availableColors.length)];

   const newTier = {
     name: "Tier 3",
     seats: 30,
     id: Math.random().toString(36).substr(2, 9),
     color: randomColor,
   };

   setTiers([...tiers, newTier]);
  }
  return (
    <Box sx={{ color: "white" }}>
      <Box sx={{ paddingBottom: "10px" }}>
        <Typography variant="h5">Tiers</Typography>
        <Typography variant="body1">
          Select a tier to view available seats
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ marginTop: "20px" }}>
        <Stack direction="row" spacing={2} justifyContent={"space-between"}>
          <Typography>Tier 1</Typography>
          <Typography>10/50</Typography>
        </Stack>
      </Box>
      <Stack spacing={2} sx={{ marginTop: "20px" }}>
        {tiers.map((tier) => (
          <TierItem key={tier.id} data={tier} setTiers={setTiers} />
        ))}
      </Stack>
      <Box sx={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ padding: "10px" }}
          onClick={addTier}
        >
          Add Tier
        </Button>
      </Box>
    </Box>
  );
};

export default TierCard;

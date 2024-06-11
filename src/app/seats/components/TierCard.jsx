import { Typography, Box, Divider, Stack, Button } from "@mui/material";
import React from "react";
import TierItem from "./TierItem";
import { colors } from "@/constants/colors";
import UrlConfig from "@/config/urlConfig";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useMapObjectContext } from "@/context/MapObjectContext";
import { useEffect } from "react";
// const tierItems = [
//   {
//     name: "Tier 1",
//     seats: 10,
//     //id: Math.random().toString(36).substr(2, 9),
//     color: "#FFFB77",
//   },
//   {
//     name: "Tier 2",
//     seats: 20,
//     //id: Math.random().toString(36).substr(2, 9),
//     color: "#FF6961",
//   },
// ];

const TierCard = ({ eventId }) => {
  const [tiers, setTiers] = React.useState([]);
  const axiosPrivate = useAxiosPrivate();

  async function addTier(e) {
    try {
      const usedColors = tiers.map((tier) => tier.color);

      const availableColors = colors.filter(
        (color) => !usedColors.includes(color)
      );

      const randomColor =
        availableColors[Math.floor(Math.random() * availableColors.length)];

      const newTier = {
        name: "Tier " + (tiers.length + 1).toString(),
        seats: 30,
        //  id: Math.random().toString(36).substr(2, 9),
        color: randomColor,
        event: eventId,
      };

      const response = await axiosPrivate.post(
        UrlConfig.tier.createTier,
        newTier
      );

      if (response.data.status === "success") {
        setTiers([...tiers, newTier]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getALlTiers = async () => {
    try {
      const response = await axiosPrivate.get(
        UrlConfig.event.getTiersByEventId(eventId)
      );

      if (response.data.status === "success") {
        setTiers(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosPrivate.delete(UrlConfig.tier.deleteTier(id));

      // if (response.data.status === "success") {
      const updatedTiers = tiers.filter((tier) => tier._id !== id);
      setTiers(updatedTiers);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    getALlTiers();
  }, []);

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
          <Typography>Seat assigned</Typography>
          <Typography>10/50</Typography>
        </Stack>
      </Box>
      <Stack spacing={2} sx={{ marginTop: "20px" }}>
        {tiers?.map((tier) => (
          <TierItem
            key={tier._id}
            data={tier}
            setTiers={setTiers}
            tiers={tiers}
            handleDelete={(e) => handleDelete(tier._id)}
            handleUpdate={(id,updatedTier) => handleUpdate(tier._id, updatedTier)}
          />
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

"use client";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MainStage from "./components/MainStage";
import { Drawer, Stack, Button, IconButton, Tooltip } from "@mui/material";
import { AddIcCallOutlined } from "@mui/icons-material";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import TableRestaurantOutlinedIcon from "@mui/icons-material/TableRestaurantOutlined";
import AllInboxOutlinedIcon from "@mui/icons-material/AllInboxOutlined";
import FormatColorTextOutlinedIcon from "@mui/icons-material/FormatColorTextOutlined";
import SectionCard from "./components/SectionCard";
import TableCard from "./components/TableCard";
import ObjectCard from "./components/ObjectCard";
import TextCard from "./components/TextCard";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack direction="row">
      <Box sx={{ width: "70%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Map" {...a11yProps(0)} />
            <Tab label="Tiers" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Box sx={{ width: "100%" }}>
            <MainStage
              onSelectSeat={(seatId) => {
                console.log("selected - " + seatId);
              }}
            />
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>

      <Box
        sx={{
          position: "fixed",
          right: 0,
          width: "25%",
          height: "100vh",
          backgroundColor: "#4B4D63",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ p: 2, backgroundColor: "white", color: "black", m: 2 }}
          justifyContent="space-evenly"
          alignContent="center"
        >
          <Tooltip title="Add Section" arrow>
            <IconButton variant="contained">
              <SplitscreenIcon
                sx={{
                  fontSize: "30px",
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Table" arrow>
            <IconButton variant="contained">
              <TableRestaurantOutlinedIcon
                sx={{
                  fontSize: "30px",
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Object" arrow>
            <IconButton variant="contained">
              <AllInboxOutlinedIcon
                sx={{
                  fontSize: "30px",
                }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Add Text" arrow>
            <IconButton variant="contained">
              <FormatColorTextOutlinedIcon
                sx={{
                  fontSize: "30px",
                }}
              />
            </IconButton>
          </Tooltip>
        </Stack>
       <TextCard />
      </Box>
    </Stack>
  );
}

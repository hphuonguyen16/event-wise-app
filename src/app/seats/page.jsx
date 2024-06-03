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
import TierCard from "./components/TierCard";
import { useMapObjectContext } from "@/context/MapObjectContext";

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
  const { mapData, setMapData, chosenOption, setChosenOption } =
    useMapObjectContext();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChosenOption = (option) => {
    setChosenOption(option);
    setMapData({
      ...mapData,
      selectedObject: {
        section: null,
        object: null,
        text: null,
        table: null,
      },
    });
  };

  return (
    <Stack direction="row">
      <Box sx={{ width: "70%" }}>
        <MainStage
          onSelectSeat={(seatId) => {
            console.log("selected - " + seatId);
          }}
          mapData={mapData}
          setMapData={setMapData}
        />
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
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Map" {...a11yProps(0)} />
            <Tab
              label="Tiers"
              {...a11yProps(1)}
              onClick={() => {
                handleChosenOption(4);
              }}
            />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ p: 2, backgroundColor: "white", color: "black", m: 2 }}
            justifyContent="space-evenly"
            alignContent="center"
          >
            <Tooltip title="Add Section" arrow>
              <IconButton
                variant="contained"
                onClick={() => {
                  handleChosenOption(0);
                }}
              >
                <SplitscreenIcon
                  sx={{
                    fontSize: "30px",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add Table" arrow>
              <IconButton
                variant="contained"
                onClick={() => {
                  handleChosenOption(1);
                }}
              >
                <TableRestaurantOutlinedIcon
                  sx={{
                    fontSize: "30px",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add Object" arrow>
              <IconButton
                variant="contained"
                onClick={() => {
                  handleChosenOption(2);
                }}
              >
                <AllInboxOutlinedIcon
                  sx={{
                    fontSize: "30px",
                  }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Add Text" arrow>
              <IconButton
                variant="contained"
                onClick={() => {
                  handleChosenOption(3);
                }}
              >
                <FormatColorTextOutlinedIcon
                  sx={{
                    fontSize: "30px",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Stack>
          {chosenOption === 0 && (
            <SectionCard editData={mapData.selectedObject.section} />
          )}
          {chosenOption === 1 && (
            <TableCard editData={mapData.selectedObject.table} />
          )}
          {chosenOption === 2 && (
            <ObjectCard editData={mapData.selectedObject.object} />
          )}
          {chosenOption === 3 && (
            <TextCard editData={mapData.selectedObject.text} />
          )}
          {chosenOption === 4 && <TierCard />}
          {mapData.selectedObject.section && (
            <SectionCard editData={mapData.selectedObject.section} />
          )}
          {mapData.selectedObject.table && (
            <TableCard editData={mapData.selectedObject.table} />
          )}
          {mapData.selectedObject.object && (
            <ObjectCard editData={mapData.selectedObject.object} />
          )}
          {mapData.selectedObject.text && (
            <TextCard editData={mapData.selectedObject.text} />
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TierCard />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
    </Stack>
  );
}

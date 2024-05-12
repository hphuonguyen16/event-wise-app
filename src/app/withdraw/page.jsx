"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import WithdrawMethod from "./WithdrawMethod";
import WithdrawRequest from "./WithdrawRequest";
import WithdrawHistory from "./WithdrawHistory";

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Withdraw() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      style={{
        width: "100%",
        maxHeight: "93vh",
        overflow: "auto",
        padding: "20px 100px",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons={false}
        >
          <Tab label="Phương thức thanh toán" {...a11yProps(0)} />
          <Tab label="Yêu cầu rút tiền" {...a11yProps(1)} />
          <Tab label="Lịch sử" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <WithdrawMethod />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <WithdrawRequest />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <WithdrawHistory />
      </CustomTabPanel>
    </div>
  );
}

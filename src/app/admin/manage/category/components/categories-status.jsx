import React from "react";
import Rootmodal from "@/components/common/modals/RootModal";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import KeyboardDoubleArrowRightTwoToneIcon from "@mui/icons-material/KeyboardDoubleArrowRightTwoTone";
import {
  Grid,
  Typography,
  Stack,
  Avatar,
  Container,
  FormControl,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import moment from "moment";
import axiosPrivate from "@/axios/axiosPrivate";
import UrlConfig from "@/config/urlConfig";

const EventStatus = ({ open, setOpen, ticketStatus, setTicketStatus }) => {
  function handleChange(event) {
      setTicketStatus(event.target.value);
      
  }
  return (
    <>
      <Rootmodal
        variant="Info"
        title={"Detail Transaction"}
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={() => setOpen()}
        closeOnly={true}
        width={700}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Change Status
          </Typography>
          <Typography variant="subtitle1">
            Choose a status for your event. This status affects your tickets
            wherever they are sold online.
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ticketStatus}
              label="Status"
              x
              onChange={handleChange}
            >
              <MenuItem value={"On Sale"}>On Sale</MenuItem>
              <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
              <MenuItem value={"Postponed"}>Postponed</MenuItem>
              <MenuItem value={"Upcoming"}>Upcoming</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Rootmodal>
    </>
  );
};

export default DetailTransaction;

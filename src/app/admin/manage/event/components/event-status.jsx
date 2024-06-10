import React, { useState } from "react";
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
import UrlConfig from "@/config/urlConfig";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useSnackbar from "@/context/snackbarContext";
import CustomSnackbar from "@/components/common/Snackbar";

const EventStatus = ({ open, setOpen, eventId, reloadData }) => {
  const axiosPrivate = useAxiosPrivate();
  const { setSnack } = useSnackbar();
  const [ticketStatus, setTicketStatus] = useState();
  function handleChange(event) {
    setTicketStatus(event.target.value);
  }

  async function handleSave() {
    try {
      const res = await axiosPrivate.put(
        UrlConfig.event.changeTicketStatusEvent(eventId),
        {
          ticketStatus: ticketStatus,
        }
      );
      if (res.data.status === "success") {
        reloadData();
        setOpen(false);
        setSnack({
          open: true,
          message: "Ticket status changed successfully",
          type: "success",
        });
      }
    } catch (error) {
      setSnack({
        open: true,
        message:
          error.response.data.message ||
          "Something went wrong! Please try later.",
        type: "error",
      });
    }
  }

  return (
    <>
      <CustomSnackbar />
      <Rootmodal
        variant="Info"
        title={"Change Status"}
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={() => handleSave()}
        width={700}
        height={350}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, marginBottom: "20px" }}
          >
            Change Status
          </Typography>
          <Typography variant="subtitle1">
            Choose a status for your event. This status affects your tickets
            wherever they are sold online.
          </Typography>
          <FormControl sx={{ width: "80%", marginTop: "30px" }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={ticketStatus}
              label="Status"
              x
              onChange={handleChange}
            >
              <MenuItem value={"On Sale"}>On Sale</MenuItem>
              <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
              <MenuItem value={"Postponed"}>Postponed</MenuItem>
            </Select>
          </FormControl>
          {ticketStatus === "Cancelled" && (
            <Typography variant="subtitle1" sx={{ marginTop: "10px" }}>
              Ticket sales have been halted. The organizer will be notified to
              process ticket refunds.
            </Typography>
          )}
          {ticketStatus === "Postponed" && (
            <Typography variant="subtitle1" sx={{ marginTop: "10px" }}>
              This status ends tickets sales.
            </Typography>
          )}
        </Box>
      </Rootmodal>
    </>
  );
};

export default EventStatus;

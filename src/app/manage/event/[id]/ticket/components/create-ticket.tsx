import useResponsive from "@/hooks/useResponsive";
import {
  Box,
  Modal,
  Button,
  TextField,
  Typography,
  Grid, // Import Grid component from MUI
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import React from "react";
import useSnackbar from "@/context/snackbarContext";
import CustomSnackbar from "@/components/common/Snackbar";

interface CreateTicketProps {
  handleClose: () => void;
  dataForm: any;
  setDataForm: any;
  handleSave: () => void;
}

const CreateTicket = ({
  handleClose,
  dataForm,
  setDataForm,
  handleSave,
}: CreateTicketProps) => {
  
  const [open, setOpen] = React.useState(false);
  const isMobile = useResponsive("down", "sm");
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setDataForm((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(dataForm);

  return (
    <Grid container spacing={5} sx={{ padding: "15px" }}>

      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item>
            <Typography variant="h4">Add Ticket</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              required
              value={dataForm.name}
              onChange={handleChange}
              name="name"
            />
          </Grid>
          <Grid item container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Available quantity"
                variant="outlined"
                fullWidth
                required
                value={dataForm.quantity}
                onChange={handleChange}
                name="quantity"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                required
                value={dataForm.price}
                onChange={handleChange}
                name="price"
              />
            </Grid>
          </Grid>
          <Grid item container spacing={3}>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Start Date"
                    sx={{
                      width: "100%",
                    }}
                    value={dataForm.startDate}
                    onChange={(newValue) =>
                      //@ts-ignore
                      setDataForm((prevData) => ({
                        ...prevData,
                        startDate: newValue,
                      }))
                    }
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="End Date"
                    sx={{
                      width: "100%",
                    }}
                    value={dataForm.endDate}
                    onChange={(newValue) =>
                      //@ts-ignore

                      setDataForm((prevData) => ({
                        ...prevData,
                        endDate: newValue,
                      }))
                    }
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid item container spacing={3}>
            <Grid item xs={12} md={6}>
              <TimePicker
                label="Start Time"
                sx={{
                  width: "100%",
                }}
                value={dataForm.startTime}
                onChange={(newValue) =>
                  //@ts-ignore

                  setDataForm((prevData) => ({
                    ...prevData,
                    startTime: newValue,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TimePicker
                label="End Time"
                sx={{
                  width: "100%",
                }}
                value={dataForm.endTime}
                onChange={(newValue) =>
                  //@ts-ignore

                  setDataForm((prevData) => ({
                    ...prevData,
                    endTime: newValue,
                  }))
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography variant="subtitle2" sx={{ marginBottom: "5px" }}>
                Tickets per order
              </Typography>
              <Grid item container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Minimum quantity"
                    variant="outlined"
                    fullWidth
                    required
                    value={dataForm.minQuantity}
                    onChange={handleChange}
                    name="minQuantity"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Maximum quantity"
                    variant="outlined"
                    fullWidth
                    required
                    value={dataForm.maxQuantity}
                    onChange={handleChange}
                    name="maxQuantity"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Sales channel
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={dataForm.salesChannel}
                onChange={(e) =>
                  //@ts-ignore

                  setDataForm((prevData) => ({
                    ...prevData,
                    salesChannel: e.target.value,
                  }))
                }
                label="Sales Channel"
              >
                <MenuItem value={10}>Everywhere</MenuItem>
                <MenuItem value={20}>Online only</MenuItem>
                <MenuItem value={30}>At the door only</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button variant="outlined">Cancel</Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={(event) => {
                  handleSave();
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateTicket;

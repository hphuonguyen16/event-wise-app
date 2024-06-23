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
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import React from "react";
import useSnackbar from "@/context/snackbarContext";
import CustomSnackbar from "@/components/common/Snackbar";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import UrlConfig from "@/config/urlConfig";

interface CreateTicketProps {
  handleClose: () => void;
  dataForm: any;
  setDataForm: any;
  handleSave: () => void;
  tiers: any;
  setTiers: any;
  isReservedSeating: any;
}

const CreateTicket = ({
  handleClose,
  dataForm,
  setDataForm,
  handleSave,
  tiers,
  setTiers,
  isReservedSeating,
}: CreateTicketProps) => {
  const [open, setOpen] = React.useState(false);
  const isMobile = useResponsive("down", "sm");
  const axiosPrivate = useAxiosPrivate();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log("name", name);
    console.log("value", value);
    setDataForm((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log("dataForm", dataForm);

  //handle change select

  return (
    <Box>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item>
              <Typography variant="h4">Ticket</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              // value={dataForm.ticketType}
              defaultValue={dataForm.ticketType}
              onChange={(e) => {
                setDataForm((prevData: any) => ({
                  ...prevData,
                  ticketType: e.target.value,
                }));
              }}
            >
              <FormControlLabel value="free" control={<Radio />} label="Free" />
              <FormControlLabel value="paid" control={<Radio />} label="Paid" />
            </RadioGroup>
          </FormControl>
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
            {isReservedSeating && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Tier</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Tier"
                    name="tier"
                    defaultValue={dataForm.tier?._id}
                    onChange={(e) => handleChange(e)}
                  >
                    {
                      //@ts-ignore
                      tiers?.map((tier: any) => (
                        <MenuItem value={tier._id} key={tier._id}>
                          {tier.name}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
            )}
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
                  type="number"
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
                  type="number"
                  disabled={dataForm.ticketType === "free"}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={3}>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DateTimePicker
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
                    <DateTimePicker
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
                      type="number"
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
                      type="number"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            {/* <Grid item xs={12}>
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
                  <MenuItem value={"both"}>Everywhere</MenuItem>
                  <MenuItem value={"online"}>Online only</MenuItem>
                  <MenuItem value={"offline"}>At the door only</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
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
    </Box>
  );
};

export default CreateTicket;

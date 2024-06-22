import useResponsive from "@/hooks/useResponsive";
import {
  Box,
  Modal,
  Button,
  TextField,
  Typography,
  Grid,
  InputAdornment, // Import Grid component from MUI
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
import MultipleSelectChip from "./ticketTypeSelect";

interface CreateTicketProps {
  handleClose: () => void;
  dataForm: any;
  setDataForm: any;
  handleSave: () => void;
  ticketTypes: any;
  setTicketTypes: any;
  selectedTicketType: any;
  setSelectedTicketType: any;
}

const CreateTicket = ({
  handleClose,
  dataForm,
  setDataForm,
  handleSave,
  ticketTypes,
  setTicketTypes,
  selectedTicketType,
  setSelectedTicketType,
}: CreateTicketProps) => {
  const [open, setOpen] = React.useState(false);
  const isMobile = useResponsive("down", "sm");
  const axiosPrivate = useAxiosPrivate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setDataForm((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //handle change select

  return (
    <Box>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item>
              <Typography variant="h4">Promo</Typography>
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
                onChange={(e) =>
                  setDataForm({ ...dataForm, name: e.target.value })
                }
                name="name"
              />
            </Grid>
            <Grid item container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Discount Amount"
                  variant="outlined"
                  fullWidth
                  required
                  // value={dataForm.discountAmount}
                  onChange={(e) =>
                    setDataForm({
                      ...dataForm,
                      discount: e.target.value,
                      discountType: "amount",
                    })
                  }
                  name="price"
                  type="number"
                  defaultValue={
                    dataForm.discountType === "amount" ? dataForm.discount : ""
                  }
                  disabled={
                    dataForm.discountType === "percentage" &&
                    dataForm.discount !== ""
                  }

                  // disabled={dataForm.ticketType === "free"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Discount Percentage"
                  id="filled-start-adornment"
                  fullWidth
                  type="number"
                  defaultValue={
                    dataForm.discountType === "percentage"
                      ? dataForm.discount
                      : ""
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                  }}
                  onChange={(e) =>
                    setDataForm({
                      ...dataForm,
                      discount: e.target.value,
                      discountType: "percentage",
                    })
                  }
                  disabled={
                    dataForm.discountType === "amount" &&
                    dataForm.discount !== ""
                  }
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid item container spacing={3}>
              {/* <Typography variant="subtitle2" sx={{ marginBottom: "5px" }}>
                Promo code starts
              </Typography> */}
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
                <Typography sx={{ marginBottom: "5px" }}>
                  Apply codes to
                </Typography>
                {/* <RadioGroup>
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="All tickets"
                  />
                  <FormControlLabel
                    value="certain"
                    control={<Radio />}
                    label="Certain tickets"
                  />
                </RadioGroup> */}
                <MultipleSelectChip
                  data={ticketTypes}
                  setData={setTicketTypes}
                  selectedTicketType={selectedTicketType}
                  setSelectedTicketType={setSelectedTicketType}
                />
              </Box>
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
    </Box>
  );
};

export default CreateTicket;

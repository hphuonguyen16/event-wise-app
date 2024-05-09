import PropTypes from "prop-types";

import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";

import Iconify from "@/components/iconify";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Grid from "@mui/material/Grid";

// ----------------------------------------------------------------------

export default function UserTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  onFilterStatus,
  filterStatus,
  filterData,
  setFilterData,
}) {
  return (
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
        marginBottom: "20px",
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Grid container spacing={2}>
          <Grid item md={4} sx={{ marginTop: "8px" }}>
            <OutlinedInput
              value={filterData.name}
              onChange={(e) => {
                setFilterData({ ...filterData, name: e.target.value });
              }}
              placeholder="Search order #, name or email"
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: "text.disabled", width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
              sx={{ width: "100%" }} // Adjust width as needed
            />
          </Grid>
          <Grid item md={2} sx={{ marginTop: "8px" }}>
            <FormControl fullWidth>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterData.status || "all"}
                  onChange={(e) => { setFilterData({ ...filterData, status: e.target.value }) }}
              >
                <MenuItem value={"all"}>All Orders</MenuItem>
                <MenuItem value={"pending_refund"}>
                  Pending Refund Requests
                </MenuItem>
                <MenuItem value={"cancelled"}>Cancelled Orders</MenuItem>
                <MenuItem value={"completed"}>Completed Orders</MenuItem>
                <MenuItem value={"refunded"}>Refunded Orders</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={filterData.startDate || null}
                  onChange={(newValue) => {
                    //@ts-ignore
                    setFilterData({ ...filterData, startDate: newValue });  
                  }}
                  label="Start Date"
                  fullWidth
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={filterData.endDate || null}
                  onChange={(newValue) => {
                    //@ts-ignore
                    setFilterData({ ...filterData, endDate: newValue });
                  }}
                  label="End Date"
                  fullWidth
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

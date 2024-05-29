import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import Brightness1OutlinedIcon from "@mui/icons-material/Brightness1Outlined";
import SquareOutlinedIcon from "@mui/icons-material/SquareOutlined";

function TableCard({ mapData, setMapData }) {
  const [formData, setFormData] = React.useState({
    style: "circle",
    seats: "",
    endSeats: "",
    tablePrefix: "",
    seatPrefix: "",
  });

  const handleStyleChange = (style) => {
    setFormData((prevData) => ({ ...prevData, style }));
  };

  const handleSeatsChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addTable = () => {
    if (formData.tablePrefix === "" || formData.seatPrefix === "") {
      return "Table and seat prefix must not be empty.";
    }
    if (formData.seats < 1) {
      return "Number of seats must be at least 1.";
    }
    if (formData.style !== "circle" && formData.endSeats < 1) {
      return "Number of end seats must be at least 1.";
    }
    if (formData.style !== "circle" && formData.style !== "square") {
      return "Invalid table style.";
    }
    let numEndSeats = formData.style === "circle" ? 0 : formData.endSeats;
    const seatsInfo = Array.from(
      { length: formData.seats * 2 + numEndSeats * 2 },
      (_, index) => ({
        name: `${formData.tablePrefix} - ${formData.seatPrefix} - ${
          index + 1
        }`,
        status: "free",
      })
    );

    const newTable = {
      event_id: 1,
      name: `Table ${mapData.tables.length + 1}`,
      style: formData.style,
      seats: formData.seats,
      endSeats: formData.endSeats,
      status: "free",
      seatsInfo: seatsInfo,
      tablePrefix: formData.tablePrefix,
      seatPrefix: formData.seatPrefix,
    };
    setMapData({
      ...mapData,
      tables: [...mapData.tables, newTable],
    });

    // Reset form data
    setFormData({
      style: "circle",
      seats: 0,
      endSeats: 0,
    });
  };

  return (
    <Box sx={{ background: "white", m: 2, p: 2 }}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography>Style</Typography>
            </TableCell>
            <TableCell>
              <Stack direction={"row"} alignItems={"center"}>
                <IconButton onClick={() => handleStyleChange("circle")}>
                  <Brightness1OutlinedIcon
                    sx={{
                      fontSize: "35px",
                      color: formData.style === "circle" ? "blue" : "default",
                    }}
                  />
                </IconButton>
                <IconButton onClick={() => handleStyleChange("square")}>
                  <SquareOutlinedIcon
                    sx={{
                      fontSize: "35px",
                      color: formData.style === "square" ? "blue" : "default",
                    }}
                  />
                </IconButton>
              </Stack>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Table Prefix: </Typography>
            </TableCell>
            <TableCell>
              <TextField
                variant="standard"
                name="tablePrefix"
                value={formData.tablePrefix}
                onChange={handleSeatsChange}
                sx={{ width: "50px" }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Seat Prefix: </Typography>
            </TableCell>
            <TableCell>
              <TextField
                variant="standard"
                name="seatPrefix"
                value={formData.seatPrefix}
                onChange={handleSeatsChange}
                sx={{ width: "50px" }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Seats: </Typography>
            </TableCell>
            <TableCell>
              <TextField
                variant="standard"
                name="seats"
                value={formData.seats}
                onChange={handleSeatsChange}
                sx={{ width: "50px" }}
              />
            </TableCell>
          </TableRow>
          {formData.style === "square" && (
            <TableRow>
              <TableCell>
                <Typography>End Seats: </Typography>
              </TableCell>
              <TableCell>
                <TextField
                  variant="standard"
                  type="number"
                  name="endSeats"
                  value={formData.endSeats}
                  onChange={handleSeatsChange}
                  sx={{ width: "50px" }}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Stack
        direction="row"
        spacing={2}
        sx={{ p: 2 }}
        justifyContent={"flex-end"}
      >
        <Button
          variant="outlined"
          onClick={() =>
            setFormData({
              style: "circle",
              seats: 0,
              endSeats: 0,
            })
          }
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={addTable}>
          Create
        </Button>
      </Stack>
    </Box>
  );
}

export default TableCard;

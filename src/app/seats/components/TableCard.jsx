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
  Slider,
} from "@mui/material";
import Brightness1OutlinedIcon from "@mui/icons-material/Brightness1Outlined";
import SquareOutlinedIcon from "@mui/icons-material/SquareOutlined";
import { useMapObjectContext } from "@/context/MapObjectContext";

function TableCard({ editData }) {
  const [formData, setFormData] = React.useState({
    style: editData?.style || "circle",
    seats: editData?.seats || "",
    endSeats: editData?.endSeats || "",
    tablePrefix: editData?.tablePrefix || "",
    seatPrefix: editData?.seatPrefix || "",
    size: editData?.size || "",
  });
  const { mapData, setMapData } = useMapObjectContext();

  const handleStyleChange = (style) => {
    setFormData((prevData) => ({ ...prevData, style }));
  };

  const handleSeatsChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addTable = () => {
    if (editData) {
      const updatedTables = mapData.tables.map((table) => {
        if (table?.id === editData?.id) {
          return {
            ...table,
            style: formData.style,
            seats: formData.seats,
            endSeats: formData.endSeats,
            tablePrefix: formData.tablePrefix,
            seatPrefix: formData.seatPrefix,
            size: formData.size,
          };
        }
        return table;
      });
      setMapData({
        ...mapData,
        tables: updatedTables,
      });
      return;
    }
    if (formData.seats < 1) {
      alert("Number of seats must be at least 1.");
    }
    if (formData.style !== "circle" && formData.endSeats < 0) {
      alert("Number of end seats must be at least 0.");
    }
    if (formData.style !== "circle" && formData.style !== "square") {
      alert("Invalid table style.");
    }

    const tableId = Math.random().toString(36).substr(2, 9);
    let numEndSeats = formData.style === "circle" ? 0 : formData.endSeats;
    const seatsInfo = Array.from(
      { length: formData.seats * 2 + numEndSeats * 2 },
      (_, index) => ({
        name: `${formData.tablePrefix} - ${formData.seatPrefix} - ${index + 1}`,
        status: "free",
        id: Math.random().toString(36).substr(2, 9),
        type: "table",
        tableId: tableId,
      })
    );

    const newTable = {
      event_id: 1,
      id: tableId,
      style: formData.style,
      seats: formData.seats,
      endSeats: formData.endSeats,
      status: "free",
      seatsInfo: seatsInfo,
      tablePrefix: formData.tablePrefix,
      seatPrefix: formData.seatPrefix,
      size: formData.size,
    };
    setMapData({
      ...mapData,
      tables: [...mapData.tables, newTable],
    });

    // Reset form data
    setFormData({
      style: "circle",
      seats: "",
      endSeats: "",
      tablePrefix: "",
      seatPrefix: "",
      size: "",
    });
  };

  const handleSliderChange = (event, newValue, name) => {
    const selectedSection = mapData.selectedObject?.table;
    const updatedSections = mapData.tables.map((section) => {
      if (section?.id === selectedSection?.id) {
        return {
          ...section,
          [name]: newValue,
        };
      }
      return section;
    });
    setMapData({
      ...mapData,
      tables: updatedSections,
    });
  };

  const handleDelete = () => {
    const updatedTables = mapData.tables.filter(
      (table) => table?.id !== editData?.id
    );
    setMapData({
      ...mapData,
      tables: updatedTables,
    });
    setFormData({
      style: "circle",
      seats: "",
      endSeats: "",
      tablePrefix: "",
      seatPrefix: "",
      size: "",
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
          {editData && (
            <TableRow>
              <TableCell>
                <Typography>Rotate: </Typography>
              </TableCell>
              <TableCell>
                <Slider
                  aria-label="Volume"
                  // value={value}
                  defaultValue={editData?.rotation || 0}
                  onChange={(event, newValue) =>
                    handleSliderChange(event, newValue, "rotation")
                  }
                  min={0}
                  max={360}
                />
              </TableCell>
            </TableRow>
          )}
          {/* <TableRow>
            <TableCell>
              <Typography>Size: </Typography>
            </TableCell>
            <TableCell>
              <TextField
                variant="standard"
                name="size"
                value={formData.size}
                onChange={handleSeatsChange}
                sx={{ width: "50px" }}
              />
            </TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
      <Stack
        direction="row"
        spacing={2}
        sx={{ p: 2 }}
        justifyContent={"flex-end"}
      >
        {editData && (
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        )}
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
          Save
        </Button>
      </Stack>
    </Box>
  );
}

export default TableCard;

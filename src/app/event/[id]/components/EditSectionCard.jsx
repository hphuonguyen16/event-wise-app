import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Button,
} from "@mui/material";
import { useMapObjectContext } from "@/context/MapObjectContext";

function EditSectionCard() {
  const [row, setRow] = React.useState(0);
  const [column, setColumn] = React.useState(0);
  const [sectionName, setSectionName] = React.useState("");
  const { mapData, setMapData } = useMapObjectContext();
  const addSectionSeat = () => {
    if (row && column) {
      const seatsByRows = Array.from({ length: row }, (_, rowIndex) => ({
        [rowIndex + 1]: Array.from({ length: column }, (_, colIndex) => ({
          name: `Seat ${rowIndex + 1}-${colIndex + 1}`,
          status: "free",
        })),
      })).reduce((acc, curr) => ({ ...acc, ...curr }), {});
      const newSection = {
        event_id: 1,
        name: sectionName,
        subsections: [
          {
            id: 1,
            section_id: 1,
            seats_by_rows: seatsByRows,
          },
        ],
      };
      setMapData({
        ...mapData,
        sections: [...mapData.sections, newSection],
      });
    }
  };

  console.log(mapData);

  return (
    <Box sx={{ background: "white", m: 2 }}>
      <Table>
        <TableBody>
          {/* <TableRow>
            <TableCell sx={{width:'100%'}}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                //   value={age}
                  label="Age"
                //   onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </TableCell>
          </TableRow> */}
          <TableRow>
            <TableCell>
              <Typography>Section Name: </Typography>
            </TableCell>
            <TableCell>
              <TextField
                variant="standard"
                sx={{ width: "100px" }}
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Row: </Typography>
            </TableCell>
            <TableCell>
              <TextField
                variant="standard"
                type="number"
                sx={{ width: "50px" }}
                value={row}
                onChange={(e) => setRow(e.target.value)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Column: </Typography>
            </TableCell>
            <TableCell>
              <TextField
                variant="standard"
                type="number"
                sx={{ width: "50px" }}
                value={column}
                onChange={(e) => setColumn(e.target.value)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Curve: </Typography>
            </TableCell>
            <TableCell>
              <TextField
                variant="standard"
                type="number"
                sx={{ width: "50px" }}
                value={column}
                onChange={(e) => setColumn(e.target.value)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Skew: </Typography>
            </TableCell>
            <TableCell>
              <TextField
                variant="standard"
                type="number"
                sx={{ width: "50px" }}
                value={column}
                onChange={(e) => setColumn(e.target.value)}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Stack
        direction="row"
        spacing={2}
        sx={{ p: 2 }}
        justifyContent={"flex-end"}
      >
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained" onClick={(event) => addSectionSeat()}>
          Create
        </Button>
      </Stack>
    </Box>
  );
}

export default EditSectionCard;

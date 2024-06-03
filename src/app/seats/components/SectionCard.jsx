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
  Slider,
} from "@mui/material";
import { useMapObjectContext } from "@/context/MapObjectContext";

function SectionCard({ editData }) {
  const [row, setRow] = React.useState(editData?.row || "");
  const [column, setColumn] = React.useState(editData?.column || "");
  const [sectionName, setSectionName] = React.useState(editData?.name || "");
  const { mapData, setMapData } = useMapObjectContext();
  console.log(editData);
  const generateSeatsByRows = (row, column, sectionId, sectionName) => {
    return Array.from({ length: row }, (_, rowIndex) => ({
      [rowIndex + 1]: Array.from({ length: column }, (_, colIndex) => ({
        name: `Seat ${rowIndex + 1}-${colIndex + 1}`,
        status: "free",
        type: "section",
        sectionId: sectionId,
        sectionName: sectionName,
        id : Math.random().toString(36).substr(2, 9),
      })),
    })).reduce((acc, curr) => ({ ...acc, ...curr }), {});
  };

  const addSectionSeat = () => {
    if (editData) {
      const updatedSections = mapData.sections.map((section) => {
        if (section?.id === editData?.id) {
          return {
            ...section,
            name: sectionName,
            row: row,
            column: column,
            subsections: [
              {
                ...section.subsections[0], // Assuming only one subsection per section
                seats_by_rows: generateSeatsByRows(row, column, section.id, section.name),
              },
            ],
          };
        }
        return section;
      });
      setMapData({
        ...mapData,
        sections: updatedSections,
      });
    } else if (row && column) {
      const sectionId = Math.random().toString(36).substr(2, 9);
      const newSection = {
        id: sectionId,
        name: sectionName,
        rotation: 0,
        skewX: 0,
        skewY: 0,
        row: row,
        column: column,
        subsections: [
          {
            id: 1,
            section_id: sectionId,
            seats_by_rows: generateSeatsByRows(row, column, sectionId),
          },
        ],
      };
      setMapData({
        ...mapData,
        sections: [...mapData.sections, newSection],
      });
    }
  };

  const handleSliderChange = (event, newValue, name) => {
    const selectedSection = mapData.selectedObject?.section;
    const updatedSections = mapData.sections.map((section) => {
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
      sections: updatedSections,
    });
  };

  const handleDelete = () => {
    const updatedSections = mapData.sections.filter(
      (section) => section?.id !== editData?.id
    );
    setMapData({
      ...mapData,
      sections: updatedSections,
    });
    setSectionName("");
    setRow("");
    setColumn("");
  };

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
          {/* <TableRow>
            <TableCell>
              <Typography>Curve: </Typography>
            </TableCell>
            <TableCell>
              <Slider
                aria-label="Volume"
                // value={value}
                onChange={(event, newValue) =>
                  handleSliderChange(event, newValue, "curve")
                }
              />
            </TableCell>
          </TableRow> */}
          {editData && (
            <>
              <TableRow>
                <TableCell>
                  <Typography>Skew X: </Typography>
                </TableCell>
                <TableCell>
                  <Slider
                    aria-label="Volume1"
                    defaultValue={editData?.skewX}
                    onChange={(event, newValue) =>
                      handleSliderChange(event, newValue, "skewX")
                    }
                    min={-1.5}
                    max={1.5}
                    step={0.1}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>Rotate: </Typography>
                </TableCell>
                <TableCell>
                  <Slider
                    aria-label="Volume"
                    // value={value}
                    defaultValue={editData?.rotation}
                    onChange={(event, newValue) =>
                      handleSliderChange(event, newValue, "rotation")
                    }
                    min={0}
                    max={360}
                  />
                </TableCell>
              </TableRow>
            </>
          )}
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
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained" onClick={(event) => addSectionSeat()}>
          Save
        </Button>
      </Stack>
    </Box>
  );
}

export default SectionCard;

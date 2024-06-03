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

function TextCard({ editData }) {
  const [text, setText] = React.useState(editData?.text || "");
  const [size, setSize] = React.useState(editData?.size || 14);
  const { mapData, setMapData } = useMapObjectContext();

  console.log(mapData);

  const addText = () => {
    if (editData) {
      const updatedTexts = mapData.texts.map((item) => {
        if (item?.id === editData?.id) {
          return {
            ...item,
            text: text,
            size: size,
          };
        }
        return item;
      });
      setMapData({
        ...mapData,
        texts: updatedTexts,
      });
      return;
    }
    if (String(text).trim() === "") {
      return "Text and size must not be empty.";
    }
    const newText = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      size,
    };
    setMapData({
      ...mapData,
      texts: [...mapData.texts, newText],
    });
  };

  const handleSliderChange = (event, newValue, name) => {
    const selectedSection = mapData.selectedObject?.text;
    const updatedSections = mapData.texts.map((section) => {
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
      texts: updatedSections,
    });
    
  };

  const handleDelete = () => {
    const updatedSections = mapData.texts.filter(
      (section) => section?.id !== editData?.id
    );
    setMapData({
      ...mapData,
      texts: updatedSections,
    });
    setText("");
    setSize(14);
  };

  return (
    <Box sx={{ background: "white", m: 2 }}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography>Text: </Typography>
            </TableCell>
            <TableCell>
              <TextField
                variant="standard"
                sx={{ width: "130px" }}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Size: </Typography>
            </TableCell>
            <TableCell>
              <TextField
                variant="standard"
                type="number"
                sx={{ width: "50px" }}
                value={size}
                onChange={(e) => setSize(e.target.value)}
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
                defaultValue={editData?.rotation || 0}
                onChange={(event, newValue) =>
                  handleSliderChange(event, newValue, "rotation")
                }
                min={0}
                max={360}
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
        <Button variant="contained" onClick={() => addText()}>
          Save
        </Button>
      </Stack>
    </Box>
  );
}

export default TextCard;

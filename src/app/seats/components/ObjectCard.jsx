import React, { useState } from "react";
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
  Icon,
  IconButton,
  Slider,
} from "@mui/material";
import Brightness1OutlinedIcon from "@mui/icons-material/Brightness1Outlined";
import SquareOutlinedIcon from "@mui/icons-material/SquareOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import LocalBarOutlinedIcon from "@mui/icons-material/LocalBarOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import { useMapObjectContext } from "@/context/MapObjectContext";

function ObjectCard({ editData }) {
  const [formData, setFormData] = useState({
    shape: editData?.shape || "circle",
    label: editData?.label || "",
    icon: editData?.icon || "",
    width: editData?.width || "",
    height: editData?.height || "",
    size: editData?.size || "",
  });
  const { mapData, setMapData } = useMapObjectContext();

  const handleStyleChange = (shape) => {
    setFormData((prevData) => ({ ...prevData, shape }));
  };

  const handleLabelChange = (event) => {
    setFormData((prevData) => ({ ...prevData, label: event.target.value }));
  };

  const handleIconChange = (iconComponent) => {
    setFormData((prevData) => ({ ...prevData, icon: iconComponent }));
  };
  const create = () => {
    const { shape, label, icon, width, height, size } = formData;

    if (editData) {
      const updatedObjects = mapData.objects.map((object) => {
        if (object.id === editData.id) {
          return {
            ...object,
            shape,
            label,
            icon,
            width,
            height,
            size,
          };
        }
        return object;
      });

      setMapData((prevData) => ({
        ...prevData,
        objects: updatedObjects,
      }));

      return;
    }

    // Add validation or other necessary logic here
    if (!label) {
      alert("Please enter a label");
      return;
    }

    //input in mapData.objects

    setMapData((prevData) => ({
      ...prevData,
      objects: [
        ...prevData.objects,
        {
          id: Math.random().toString(36).substr(2, 9),
          shape,
          label,
          icon,
          width,
          height,
          size,
          rotation: 0,
        },
      ],
    }));
  };

  const handleSliderChange = (event, newValue, name) => {
    const selectedSection = mapData.selectedObject?.object;
    const updatedSections = mapData.objects.map((section) => {
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
      objects: updatedSections,
    });
  };

  const handleDelete = () => {
    const updatedObjects = mapData.objects.filter(
      (object) => object.id !== editData.id
    );
    setMapData((prevData) => ({
      ...prevData,
      objects: updatedObjects,
    }));
    setFormData({
      shape: "circle",
      label: "",
      icon: "",
      width: "",
      height: "",
      size: "",
    });
  }

  return (
    <Box sx={{ background: "white", m: 2 }}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography>Shape</Typography>
            </TableCell>
            <TableCell>
              <Stack direction={"row"} alignItems={"center"}>
                <IconButton onClick={() => handleStyleChange("circle")}>
                  <Brightness1OutlinedIcon
                    sx={{
                      fontSize: "35px",
                      color: formData.shape === "circle" ? "blue" : "default",
                    }}
                  />
                </IconButton>
                <IconButton onClick={() => handleStyleChange("square")}>
                  <SquareOutlinedIcon
                    sx={{
                      fontSize: "35px",
                      color: formData.shape === "square" ? "blue" : "default",
                    }}
                  />
                </IconButton>
              </Stack>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Label</Typography>
            </TableCell>
            <TableCell>
              <TextField
                variant="standard"
                sx={{ width: "200px" }}
                value={formData.label}
                onChange={handleLabelChange}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Width</Typography>
            </TableCell>
            <TableCell>
              <TextField
                variant="standard"
                sx={{ width: "200px" }}
                value={formData.width}
                onChange={(e) =>
                  setFormData({ ...formData, width: e.target.value })
                }
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Height</Typography>
            </TableCell>
            <TableCell>
              <TextField
                variant="standard"
                sx={{ width: "200px" }}
                value={formData.height}
                onChange={(e) =>
                  setFormData({ ...formData, height: e.target.value })
                }
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Size</Typography>
            </TableCell>
            <TableCell>
              <TextField
                variant="standard"
                sx={{ width: "200px" }}
                value={formData.size}
                onChange={(e) =>
                  setFormData({ ...formData, size: e.target.value })
                }
              />
            </TableCell>
          </TableRow>
          {editData && (
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
          )}
          {/* <TableRow>
            <TableCell>
              <Typography>Object Icon</Typography>
            </TableCell>
            <TableCell>
              <Stack direction="row" alignItems="center" sx={{ flex: "wrap" }}>
                <IconButton
                  onClick={() => handleIconChange(<MicOutlinedIcon />)}
                >
                  <MicOutlinedIcon
                    sx={{
                      color:
                        formData.icon?.type === MicOutlinedIcon
                          ? "blue"
                          : "default",
                    }}
                  />
                </IconButton>
                <IconButton
                  onClick={() => handleIconChange(<RestaurantOutlinedIcon />)}
                >
                  <RestaurantOutlinedIcon
                    sx={{
                      color:
                        formData.icon?.type === RestaurantOutlinedIcon
                          ? "blue"
                          : "default",
                    }}
                  />
                </IconButton>
                <IconButton
                  onClick={() => handleIconChange(<LocalBarOutlinedIcon />)}
                >
                  <LocalBarOutlinedIcon
                    sx={{
                      color:
                        formData.icon?.type === LocalBarOutlinedIcon
                          ? "blue"
                          : "default",
                    }}
                  />
                </IconButton>
                <IconButton
                  onClick={() => handleIconChange(<ExitToAppOutlinedIcon />)}
                >
                  <ExitToAppOutlinedIcon
                    sx={{
                      color:
                        formData.icon?.type === ExitToAppOutlinedIcon
                          ? "blue"
                          : "default",
                    }}
                  />
                </IconButton>
                <IconButton
                  onClick={() => handleIconChange(<CelebrationOutlinedIcon />)}
                >
                  <CelebrationOutlinedIcon
                    sx={{
                      color:
                        formData.icon?.type === CelebrationOutlinedIcon
                          ? "blue"
                          : "default",
                    }}
                  />
                </IconButton>
                <IconButton
                  onClick={() => handleIconChange(<WcOutlinedIcon />)}
                >
                  <WcOutlinedIcon
                    sx={{
                      color:
                        formData.icon?.type === WcOutlinedIcon
                          ? "blue"
                          : "default",
                    }}
                  />
                </IconButton>
              </Stack>
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
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained" onClick={create}>
          Save
        </Button>
      </Stack>
    </Box>
  );
}

export default ObjectCard;

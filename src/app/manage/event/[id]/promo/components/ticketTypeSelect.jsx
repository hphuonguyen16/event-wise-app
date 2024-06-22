import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import UrlConfig from "@/config/urlConfig";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function TicketTypeSelectChip({
  data,
  setData,
  selectedTicketType,
  setSelectedTicketType,
}) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const axiosPrivate = useAxiosPrivate();
  console.log(selectedTicketType);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setSelectedTicketType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleDelete = (event, itemToDelete) => {
    event.stopPropagation();
    console.log("11111");
    setSelectedTicketType(
      selectedTicketType.filter((item) => item._id !== itemToDelete._id)
    );
  };


  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-chip-label">Ticket Types</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedTicketType}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selectedTicketType.map((item) => (
                <Chip
                  key={item._id}
                  label={item.name}
                  onDelete={(event) => handleDelete(event, item)}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data.map((item) => (
            <MenuItem
              key={item._id}
              value={item}
              style={getStyles(item.name, personName, theme)}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

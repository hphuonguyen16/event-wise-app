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
  Icon,
  IconButton,
} from "@mui/material";
import Brightness1OutlinedIcon from "@mui/icons-material/Brightness1Outlined";
import SquareOutlinedIcon from "@mui/icons-material/SquareOutlined";

function TableCard() {
  return (
    <Box sx={{ background: "white", m: 2 }}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography>Style</Typography>
            </TableCell>
            <TableCell>
              <Stack direction={"row"} alignItems={"center"}>
                <IconButton>
                  <Brightness1OutlinedIcon sx={{ fontSize: "35px" }} />
                </IconButton>
                <IconButton>
                  <SquareOutlinedIcon sx={{ fontSize: "35px" }} />
                </IconButton>
              </Stack>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Seats: </Typography>
            </TableCell>
            <TableCell>
              <TextField
                variant="standard"
                type="number"
                sx={{ width: "50px" }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>End Seats: </Typography>
            </TableCell>
            <TableCell>
              <TextField
                variant="standard"
                type="number"
                sx={{ width: "50px" }}
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
        <Button variant="contained">Create</Button>
      </Stack>
    </Box>
  );
}

export default TableCard;

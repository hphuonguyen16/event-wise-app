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

function TextCard() {
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
                type="number"
                sx={{ width: "130px" }}
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

export default TextCard;

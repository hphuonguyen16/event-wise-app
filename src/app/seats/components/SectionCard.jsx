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

function SectionCard() {
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
              <Typography>Row: </Typography>
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
              <Typography>Column: </Typography>
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
      <Stack direction="row" spacing={2} sx={{ p: 2 }} justifyContent={'flex-end'}>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained">Create</Button>
      </Stack>
    </Box>
  );
}

export default SectionCard;

import {
  Typography,
  Box,
  Paper,
  MenuList,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ListItemIcon from "@mui/material/ListItemIcon";

const layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex"}}>
      <Box sx={{ width: "20%", height:'100vh', overflowY:'auto' }}>
        <Box sx={{ marginBottom: "40px" }}>
          <Typography variant="h4" sx={{ marginBottom: "10px" }}>
            Happy Birthday
          </Typography>
          <Typography>Mon, May 27, 2024, 10:00 AM</Typography>
          <Link
            href="/new-event-page"
            sx={{ marginTop: "10px", color: "blue" }}
          >
            {" "}
            View your event page{" "}
          </Link>
        </Box>
        <Divider sx={{ marginTop: "10px" }} />
        <Paper sx={{ marginTop: "20px" }}>
          <MenuList>
            <MenuItem sx={{ marginTop: "25px", fontWeight: "bold" }}>
              <ListItemIcon>
                <CheckCircleIcon sx={{ fontSize: "25px" }} />
              </ListItemIcon>
              Build Event Page
            </MenuItem>
            <MenuItem sx={{ marginTop: "25px", fontWeight: "bold" }}>
              <ListItemIcon>
                <CheckCircleIcon sx={{ fontSize: "25px" }} />
              </ListItemIcon>
              Add Tickets
            </MenuItem>
            <MenuItem sx={{ marginTop: "25px", fontWeight: "bold" }}>
              <ListItemIcon>
                <CheckCircleIcon sx={{ fontSize: "25px" }} />
              </ListItemIcon>
              Publish
            </MenuItem>
          </MenuList>
        </Paper>
        <Divider sx={{ marginTop: "10px" }} />

        <Paper sx={{ marginTop: "10px" }}>
          <MenuList>
            <MenuItem sx={{ marginTop: "20px" }}>Dashboard</MenuItem>
            <MenuItem sx={{ padding: 0, marginTop: "20px" }}>
              <Accordion sx={{ width: "100%" }}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>Manage Attendees</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Paper>
                    <MenuList>
                      <MenuItem sx={{ marginBottom: "10px" }}>Orders</MenuItem>
                      <MenuItem sx={{ marginBottom: "15px" }}>
                        Add Attendees{" "}
                      </MenuItem>
                      <MenuItem sx={{ marginBottom: "15px" }}>
                        Email to Attendees
                      </MenuItem>
                      <MenuItem sx={{ marginBottom: "15px" }}>
                        Attendee List
                      </MenuItem>
                      <MenuItem sx={{ marginBottom: "15px" }}>
                        Check-in
                      </MenuItem>
                    </MenuList>
                  </Paper>
                </AccordionDetails>
              </Accordion>
            </MenuItem>
          </MenuList>
        </Paper>
      </Box>
      <Box sx={{ width: "80%", backgroundColor:"#fbf9fa", padding:'10px' }}>{children}</Box>
    </Box>
  );
};

export default layout;

import { useState } from "react";
import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";

import Label from "@/components/label";
import Iconify from "@/components/iconify";
import moment from "moment";
import EventStatus from "./event-status";

// ----------------------------------------------------------------------

export default function EventTableRow({
  selected,
  id,
  title,
  location,
  detailLocation,
  date,
  image,
  ticketStatus,
  isPublished,
  handleClick,
  handleClickRow,
  handleDeleteEvent,
  reloadData,
}) {
  const [open, setOpen] = useState(null);
  const [openStatus, setOpenStatus] = useState(false);
  console.log(ticketStatus);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  function CheckStatus(eventDate) {
    const currentDate = new Date();
    const dateObject = moment(eventDate, "ddd MMM DD YYYY").toDate();
    const parsedEventDate = new Date(dateObject);
    console.log(parsedEventDate);

    if (parsedEventDate > currentDate) {
      return "On Sale";
    } else if (parsedEventDate.toDateString() === currentDate.toDateString()) {
      return "Upcoming";
    } else {
      return "Completed";
    }
  }
  return (
    <>
      {openStatus && (
        <EventStatus
          open={openStatus}
          setOpen={setOpenStatus}
          eventId={id}
          reloadData={reloadData}
        />
      )}
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell
          component="th"
          scope="row"
          padding="none"
          onClick={handleClickRow}
          sx={{ cursor: "pointer" }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <img
              src={image}
              style={{ width: 50, height: 50, borderRadius: "2px" }}
            />
            <Typography variant="subtitle" noWrap>
              {title}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          {location}
          <Typography variant="subtitle2" noWrap>
            {detailLocation}
          </Typography>
        </TableCell>

        <TableCell>{date}</TableCell>

        <TableCell>
          <Chip
            variant="outlined"
            color={
              (ticketStatus === "On Sale" && "error") ||
              (ticketStatus === "Completed" && "info") ||
              (ticketStatus === "Upcoming" && "success") ||
              "default"
            }
            label={isPublished ? ticketStatus : "Draft"}
          />
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { width: 200 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem
          onClick={handleDeleteEvent}
          sx={{ color: "error.main" }}
          disabled={
            (
              ticketStatus === "On Sale" ||
              ticketStatus === "Cancelled" ||
              ticketStatus === "Postponed"
            )
          }
        >
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => setOpenStatus(true)}
          sx={{ color: "info.main" }}
          disabled={
            (
              ticketStatus === "Upcoming" ||
              ticketStatus === "Completed" ||
              !isPublished
            )
          }
        >
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Change Status
        </MenuItem>
      </Popover>
    </>
  );
}

EventTableRow.propTypes = {
  title: PropTypes.string,
  location: PropTypes.string,
  date: PropTypes.string,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  status: PropTypes.string,
  detailLocation: PropTypes.string,
};

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

// ----------------------------------------------------------------------

export default function EventTableRow({
  selected,
  email,
  role,
  isActived,
  verify,
  approved,
  balance,
  createdAt,
  profile,
  handleClick,
  handleClickRow,
  handleDeleteEvent,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  return (
    <>
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
              src=""
              style={{ width: 50, height: 50, borderRadius: "2px" }}
            />
            <Typography variant="subtitle" noWrap>
              {email}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{profile?.name}</TableCell>
        <TableCell>{role}</TableCell>

        <TableCell>
          <Chip
            variant={isActived ? "ghost" : "filled"}
            color={isActived ? "success" : "error"}
            label={isActived ? "Active" : "Inactive"}
          />
        </TableCell>

        <TableCell>
          <Chip
            variant={verify ? "ghost" : "filled"}
            color={verify ? "success" : "error"}
            label={verify ? "Verified" : "Unverified"}
          />
        </TableCell>
        <TableCell>
          <Chip
            variant={approved ? "ghost" : "filled"}
            color={approved ? "success" : "error"}
            label={approved ? "Approved" : "Unapproved"}
          />
        </TableCell>
        <TableCell>{balance}</TableCell>
        <TableCell>{createdAt}</TableCell>

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
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDeleteEvent} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
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

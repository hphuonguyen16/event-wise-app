import { useEffect, useState } from "react";
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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CreateTicket from "./create-ticket";
import useResponsive from "@/hooks/useResponsive";
import {
  convertStringToDateJS,
  convertStringTimeToDateJS,
} from "@/utils/DateConvert";
import urlConfig from "@/config/urlConfig";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useSnackbar from "@/context/snackbarContext";
import CustomSnackbar from "@/components/common/Snackbar";
import TextField from "@mui/material/TextField";
import { formatDate } from "@/utils/DateConvert";
import dayjs from "dayjs";
// ----------------------------------------------------------------------

export default function EventTableRow({
  selected,
  ticket,
  handleClick,
  handleDeleteEvent,
  eventId,
  dataFormAdd,
  setdataFormAdd,
  reloadWhenUpdated,
}) {
  const [open, setOpen] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { setSnack } = useSnackbar();
  const [openEdit, setOpenEdit] = useState(null);
  const isMobile = useResponsive("down", "sm");
  const [dataForm, setDataForm] = useState({
    name: ticket.name,
    price: ticket.price,
    quantity: ticket.quantity,
    event: eventId,
    startDate: dayjs(ticket.startDate),
    endDate: dayjs(ticket.endDate),
    minQuantity: ticket.minQuantity,
    maxQuantity: ticket.maxQuantity,
    salesChannel: ticket.salesChannel, // Default value
    ticketType: ticket.ticketType, // Default value
  });

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenEdit = (event) => {
    setOpenEdit(true);
  };

  const TicketStatus = {
    ON_SALE: "On Sale",
    UPCOMING: "Upcoming",
    COMPLETED: "Completed",
  };

  function getTicketStatus(ticket) {
    const parsedstartDate = moment(ticket.startDate);
    const parsedendDate = moment(ticket.endDate);
    const currentDate = new Date();

    if (currentDate < parsedstartDate) {
      return TicketStatus.UPCOMING;
    } else if (currentDate > parsedendDate) {
      return TicketStatus.COMPLETED;
    } else {
      return TicketStatus.ON_SALE;
    }
  }

  return (
    <>
      <CustomSnackbar />

      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell
          component="th"
          scope="row"
          padding="none"
          sx={{ width: "25%", paddingLeft: "10px" }}
        >
          <Typography variant="subtitle" noWrap>
            {ticket.name}
          </Typography>
        </TableCell>
        <TableCell sx={{ width: "15%" }}>0/{ticket.quantity}</TableCell>
        <TableCell sx={{ width: "15%" }}>{ticket.price}</TableCell>
        <TableCell sx={{ width: "20%" }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            value={
              dataFormAdd.orders.find((order) => order.ticketType === ticket.id)
                ?.quantity
            }
            type="number"
            onChange={(e) => {
              setdataFormAdd({
                ...dataFormAdd,
                orders: dataFormAdd.orders.map((order) => {
                  if (order.ticketType === ticket.id) {
                    return {
                      ticketType: ticket.id,
                      quantity: e.target.value,
                    };
                  }
                  return order;
                }),
              });
            }}
          />
        </TableCell>
        <TableCell sx={{ width: "20%" }}>
          <TextField
            id="outlined-basic"
            label="Total"
            variant="outlined"
            fullWidth
            disabled
            value={
              ticket.price *
                dataFormAdd.orders.find(
                  (order) => order.ticketType === ticket.id
                )?.quantity || 0
            }
          />
        </TableCell>
      </TableRow>
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

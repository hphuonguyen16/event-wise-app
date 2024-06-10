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
  isUpdated
}) {
  const [open, setOpen] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { setSnack } = useSnackbar();
  const [openEdit, setOpenEdit] = useState(null);
  const isMobile = useResponsive("down", "sm");
  const [quantity, setQuantity] = useState("");
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
    COMPLETED: "End Sale",
  };

  function handleChangeQuantity(e) {
    //find index of ticket in orders
    setQuantity(e.target.value);
    setdataFormAdd({
      ...dataFormAdd,
      orders: dataFormAdd.orders.map((order) => {
        if (order.ticketType === ticket.id) {
          return {
            ticketType: ticket.id,
            quantity: e.target.value,
            price: ticket.discountPrice
          };
        }
        return order;
      }),
    });
  }

  function getTicketStatus(ticket) {
    const parsedstartDate = moment(ticket?.startDate);
    const parsedendDate = moment(ticket?.endDate);
    const currentDate = new Date();

    if (currentDate < parsedstartDate) {
      return TicketStatus.UPCOMING;
    } else if (currentDate > parsedendDate) {
      return TicketStatus.COMPLETED;
    } else {
      return TicketStatus.ON_SALE;
    }
  }

  useEffect(() => {
    //set value for quantity "" after place order
    setQuantity("");
  }, [isUpdated]);

  return (
    <>
      <CustomSnackbar />

      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell
          component="th"
          scope="row"
          padding="none"
          sx={{ width: "20%", paddingLeft: "10px" }}
        >
          <Typography variant="subtitle" noWrap>
            {ticket.name}
          </Typography>
        </TableCell>
        <TableCell sx={{ width: "10%" }}>
          {ticket.sold}/{ticket.quantity}
        </TableCell>
        <TableCell sx={{ width: "10%" }}>
          {ticket.discountPrice && ticket.discountPrice < ticket.price ? (
            <>
              <span style={{ textDecoration: "line-through" }}>
                {ticket.price.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
              <span style={{ color: "red", marginLeft: "10px" }}>
                {ticket.discountPrice.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </>
          ) : (
            ticket.price.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })
          )}
        </TableCell>
        <TableCell sx={{ width: "15%" }}>
          <Chip
            variant="outlined"
            color={
              (getTicketStatus(ticket) === TicketStatus.ON_SALE && "error") ||
              (getTicketStatus(ticket) === TicketStatus.COMPLETED && "info") ||
              (getTicketStatus(ticket) === TicketStatus.UPCOMING &&
                "success") ||
              "defaultColor"
            }
            label={getTicketStatus(ticket)}
          />
        </TableCell>

        <TableCell sx={{ width: "20%" }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            value={quantity}
            type="number"
            disabled={ticket.sold === ticket.quantity}
            onChange={handleChangeQuantity}
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
              ticket.discountPrice *
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

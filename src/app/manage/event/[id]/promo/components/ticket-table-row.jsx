import { use, useEffect, useState } from "react";
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
import CreateTicket from "./create-promo";
import useResponsive from "@/hooks/useResponsive";
import {
  convertStringToDateJS,
  convertStringTimeToDateJS,
} from "@/utils/DateConvert";
import UrlConfig from "@/config/urlConfig";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useSnackbar from "@/context/snackbarContext";
import CustomSnackbar from "@/components/common/Snackbar";
import { formatDate } from "@/utils/DateConvert";
import dayjs from "dayjs";
// ----------------------------------------------------------------------

export default function EventTableRow({
  selected,
  ticket,
  handleClick,
  handleDeleteEvent,
  eventId,
  ticketTypes,
  setTicketTypes,
  reloadWhenUpdated,
  isReservedSeating,
}) {
  const [open, setOpen] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { setSnack } = useSnackbar();
  const [openEdit, setOpenEdit] = useState(null);
  const [selectedTicketType, setSelectedTicketType] = useState(ticket?.applyTo);
  const isMobile = useResponsive("down", "sm");
  const [dataForm, setDataForm] = useState({
    ...ticket,
    startDate: dayjs(ticket?.startDate),
    endDate: dayjs(ticket?.endDate),
  });

  console.log(ticket);

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

  function getTicketStatus(ticket) {
    const parsedstartDate = moment(ticket?.startDate);
    const parsedendDate = moment(ticket?.endDate);
    const currentDate = new Date();

    if (currentDate >= parsedendDate) {
      return TicketStatus.COMPLETED;
    } else if (currentDate < parsedstartDate) {
      return TicketStatus.UPCOMING;
    } else {
      return TicketStatus.ON_SALE;
    }
  }

  const handleSave = async () => {
    try {
      if (
        !dataForm.name ||
        !dataForm.discount ||
        !dataForm.startDate ||
        !dataForm.endDate ||
        !dataForm.discountType
      ) {
        setSnack({
          open: true,
          message: "Please fill in all the required fields!",
          type: "error",
        });
        return;
      }

      //validate start date and end date use isBefore
      //compare with now
      if (moment(dataForm.startDate).isBefore(moment(new Date()), "day")) {
        setSnack({
          open: true,
          message: "Start date must be greater or today!",
          type: "error",
        });
        return;
      }
      if (moment(dataForm.endDate).isBefore(moment(new Date()), "day")) {
        setSnack({
          open: true,
          message: "End date must be greater than today!",
          type: "error",
        });
        return;
      }
      if (dataForm.startDate.isAfter(dataForm.endDate)) {
        setSnack({
          open: true,
          message: "End date must be greater than start date!",
          type: "error",
        });
        return;
      }

      const response = await axiosPrivate.put(
        UrlConfig.promo.updatePromo(ticket._id),
        {
          ...dataForm,
          applyTo: selectedTicketType.map((ticketType) => ticketType._id),
        }
      );

      if (response.data.status === "success") {
        setSnack({
          open: true,
          message: "Promo updated successfully!",
          type: "success",
        });
        reloadWhenUpdated();
        setOpenEdit(false);
        //after success, render the updated data
      }
    } catch (error) {
      //catch error
      setSnack({
        open: true,
        message: error.response?.data?.message || "Something went wrong!",
        type: "error",
      });
    }
  };
  const formatDiscount = (ticket) => {
    if (ticket.discountType === "percentage") {
      return `${ticket.discount}%`;
    } else {
      return ticket.discount.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    }
  };

  useEffect(() => {
    setDataForm({
      ...ticket,
      startDate: dayjs(ticket?.startDate),
      endDate: dayjs(ticket?.endDate),
    });
    return () => {
      setDataForm({});
    };
  }, [ticket]);

  return (
    <>
      <CustomSnackbar />

      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Typography variant="subtitle" noWrap>
            {ticket?.name}
          </Typography>
        </TableCell>
        <TableCell>
          {" "}
          {"On sale on " + formatDate(ticket?.startDate)}
          <Typography variant="subtitle2" noWrap>
            {"Ends on " + formatDate(ticket?.endDate)}
          </Typography>
        </TableCell>
        <TableCell>{formatDiscount(ticket)}</TableCell>
        <TableCell>
          {ticket.applyTo?.map((item) => {
            return (
              <Chip
                key={item._id}
                label={item.name}
                sx={{ marginRight: "3px" }}
              />
            );
          })}
        </TableCell>
        {isReservedSeating && (
          <TableCell>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  bgcolor: ticket?.tier?.color,
                }}
              ></Box>
              <Typography variant="subtitle2" noWrap>
                {ticket?.tier?.name}
              </Typography>
            </Stack>
          </TableCell>
        )}
        <TableCell>
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
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            //   width: isMobile ? '80vw' : width ? width : '100vw',
            width: isMobile ? "80%" : "40%",
            height: isMobile ? "80%" : "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            maxHeight: "100%",
            overflow: "auto",
            padding: "20px",
          }}
        >
          <CreateTicket
            handleClose={() => {
              setOpenEdit(false);
            }}
            dataForm={dataForm}
            setDataForm={setDataForm}
            handleSave={handleSave}
            ticketTypes={ticketTypes}
            setTicketTypes={setTicketTypes}
            selectedTicketType={selectedTicketType}
            setSelectedTicketType={setSelectedTicketType}
          />
        </Box>
      </Modal>

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
        <MenuItem onClick={handleOpenEdit}>
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

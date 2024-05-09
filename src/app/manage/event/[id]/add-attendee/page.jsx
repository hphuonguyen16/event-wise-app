"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CustomSnackbar from "@/components/common/Snackbar";
import TableNoData from "../../components/table-no-data";
import TableRow from "./components/table-row";
import TableHead from "./components/table-head";
import TableEmptyRows from "./components/table-empty-rows";
import TableToolbar from "./components/table-toolbar";
import { emptyRows, applyFilter, getComparator } from "./components/utils";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import UrlConfig from "@/config/urlConfig";
import useSnackbar from "@/context/snackbarContext";
import Link from "next/link";
import Modal from "@mui/material/Modal";
import CreateTicket from "./components/create-ticket";
import useResponsive from "@/hooks/useResponsive";
import dayjs from "dayjs";
import moment from "moment";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Card,
  Stack,
  TextField,
  Grid,
  Button,
} from "@mui/material";

const AddAttendee = ({ params }) => {
  const eventId = params.id;
  const isMobile = useResponsive("down", "sm");
  const [openAdd, setopenAdd] = useState(false);
  const [page, setPage] = useState(0);

  const [events, setEvents] = useState([]);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");
  const [isValidate, setIsValidate] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isUpdated, setIsUpdated] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { setSnack } = useSnackbar();
  const [dataFormAdd, setdataFormAdd] = useState({
    event: eventId,
    orders: [],
    orderType: "manual",
    status: "completed",
    contactInfo: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = events.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterStatus = (event) => {
    setPage(0);
    setFilterStatus(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: events,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const reloadWhenUpdated = () => {
    setIsUpdated(!isUpdated);
  };

  const handleSave = async () => {
    try {
      const response = await axiosPrivate.post(UrlConfig.order.createOrder, {
        event: eventId,
        orders: dataFormAdd.orders,
        orderType: dataFormAdd.orderType,
        status: dataFormAdd.status,
        contactInfo: dataFormAdd.contactInfo,
      });

      if (response.data.status === "success") {
        setSnack({
          open: true,
          message: "Order created successfully!",
          type: "success",
        });
        setdataFormAdd((prevState) => ({
          ...prevState, // Spread the previous state to ensure you don't lose any existing data
          orders: prevState.orders.map((order) => ({
            // Update the orders array
            ticketType: order.ticketType,
            quantity: null,
          })),
          contactInfo: {
            // Update the contactInfo object
            firstName: "",
            lastName: "",
            email: "",
          },
        }));
        return;
        //after success, render the updated data
      } else {
        setSnack({
          open: true,
          message: "Something went wrong! Please try again!",
          type: "error",
        });
      }
    } catch (error) {
      setSnack({
        open: true,
        message:
          error.response.data.message ||
          "Something went wrong! Please try again!",
        type: "error",
      });
    }
  };

  function validateForm() {
    if (
      dataFormAdd.contactInfo.firstName === "" ||
      dataFormAdd.contactInfo.lastName === "" ||
      dataFormAdd.contactInfo.email === ""
    ) {
      setIsValidate(false);
    } else if (dataFormAdd.orders.length > 0) {
      const isFilledTicket = dataFormAdd.orders.find(
        (order) => order.quantity !== null
      );
      if (!isFilledTicket) {
        setIsValidate(true);
      }
    } else {
      setIsValidate(true);
    }
  }
  useEffect(() => {
    validateForm();
  }, [dataFormAdd]);

  useEffect(() => {
    axiosPrivate
      .get(UrlConfig?.ticketType.getTicketTypesByEventId(eventId))
      .then((res) => {
        const events = res.data.data.map((event) => {
          return {
            id: event._id,
            name: event.name,
            price: event.price,
            quantity: event.quantity,
            status: event.status,
            startTime: event.startTime,
            endTime: event.endTime,
            startDate: event.startDate,
            endDate: event.endDate,
            ticketType: event.ticketType,
          };
        });
        const orders = events.map((event) => {
          return {
            ticketType: event.id,
            quantity: null,
          };
        });
        setdataFormAdd({ ...dataFormAdd, orders: orders });
        setEvents(events);
      });
  }, [isUpdated]);

  return (
    <Box>
      <CustomSnackbar />
      <Box>
        <Typography variant="h3">Add Attendees</Typography>{" "}
        <Typography sx={{ marginTop: "7px" }}>
          Manually add attendees info for complimentary tickets or offline
          payments
        </Typography>{" "}
        <Typography sx={{ marginTop: "10px" }} variant="subtitle1">
          * Eventwise does not charge any fees for manual orders.
        </Typography>
      </Box>
      <Card sx={{ padding: "30px", margin: "30px 0" }}>
        <Typography variant="h4">Contact information</Typography>{" "}
        <Grid container spacing={2} sx={{ width: "65%", marginTop: "10px" }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              required
              value={dataFormAdd.contactInfo.firstName}
              onChange={(e) => {
                setdataFormAdd({
                  ...dataFormAdd,
                  contactInfo: {
                    ...dataFormAdd.contactInfo,
                    firstName: e.target.value,
                  },
                });
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              required
              value={dataFormAdd.contactInfo.lastName}
              onChange={(e) => {
                setdataFormAdd({
                  ...dataFormAdd,
                  contactInfo: {
                    ...dataFormAdd.contactInfo,
                    lastName: e.target.value,
                  },
                });
              }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              required
              value={dataFormAdd.contactInfo.email}
              onChange={(e) => {
                setdataFormAdd({
                  ...dataFormAdd,
                  contactInfo: {
                    ...dataFormAdd.contactInfo,
                    email: e.target.value,
                  },
                });
              }}
            />
          </Grid>
        </Grid>
      </Card>
      <Card>
        <TableContainer sx={{ overflow: "unset" }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead
              order={order}
              orderBy={orderBy}
              rowCount={events.length}
              numSelected={selected.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[
                { id: "name", label: "Name" },
                { id: "sold", label: "Sold" },
                { id: "price", label: "Price" },
                { id: "quantity", label: "Quantity" },
                { id: "total", label: "Total" },
              ]}
            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    ticket={row}
                    dataFormAdd={dataFormAdd}
                    setdataFormAdd={setdataFormAdd}
                    selected={selected.indexOf(row.id) !== -1}
                    handleClick={(event) => handleClick(event, row.id)}
                    handleDeleteEvent={(event) => handleDeleteEvent(row.id)}
                    eventId={eventId}
                    reloadWhenUpdated={reloadWhenUpdated}
                  />
                ))}

              <TableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, events.length)}
              />

              {notFound && <TableNoData query={filterName} />}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ padding: 2 }}
        >
          <Typography sx={{ marginRight: 2, fontWeight: "bold" }}>
            Total Price
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={
              events.reduce((acc, event) => {
                return (
                  acc +
                  event.price *
                    dataFormAdd.orders.find(
                      (order) => order.ticketType === event.id
                    )?.quantity
                );
              }, 0) || 0
            }
            disabled
          />
        </Stack>
      </Card>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          sx={{
            marginTop: "20px",
            background: !isValidate
              ? //@ts-ignore
                (theme) => `${theme.palette.disabled}!important`
              : `linear-gradient(110deg, #f59df1 30%, #c474ed 60%, #c89df2 95%) !important`,
            color: "white !important",
          }}
          onClick={() => {
            handleSave();
          }}
          disabled={events.length === 0}
        >
          Place Order
        </Button>
      </Box>
    </Box>
  );
};

export default AddAttendee;

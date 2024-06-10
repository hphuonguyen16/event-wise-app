"use client";

import { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import Iconify from "@/components/iconify";

import TableNoData from "./components/table-no-data";
import TicketTableRow from "./components/ticket-table-row";
import TicketTableHead from "./components/ticket-table-head";
import TableEmptyRows from "./components/table-empty-rows";
import TicketTableToolbar from "./components/ticket-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "./components/utils";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import UrlConfig from "@/config/urlConfig";
import useSnackbar from "@/context/snackbarContext";
import CustomSnackbar from "@/components/common/Snackbar";
import Link from "next/link";
import Modal from "@mui/material/Modal";
import CreateTicket from "./components/create-ticket";
import useResponsive from "@/hooks/useResponsive";
import dayjs from "dayjs";
import moment, { min } from "moment";
import { useRouter } from "next/navigation";
import { set } from "lodash";

// ----------------------------------------------------------------------
export default function UserPage({ params }) {
  const eventId = params.id;
  const router = useRouter();
  const isMobile = useResponsive("down", "sm");
  const [openAdd, setopenAdd] = useState(false);
  const [page, setPage] = useState(0);

  const [events, setEvents] = useState([]);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isUpdated, setIsUpdated] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { setSnack } = useSnackbar();
  const [tiers, setTiers] = useState([]);
  const [eventDetail, setEventDetail] = useState({});
  const [dataFormAdd, setdataFormAdd] = useState({
    name: "",
    price: "",
    quantity: "",
    event: eventId,
    startDate: dayjs(new Date()),
    endDate: dayjs(new Date()).add(1, "day"),
    minQuantity: 1,
    maxQuantity: 10,
    salesChannel: "both", // Default value
    ticketType: "free",
    tier: "",
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
  const handleDeleteEvent = (id) => {
    axiosPrivate
      .delete(UrlConfig?.ticketType.deleteTicketType(id))
      .then((res) => {
        setEvents((prev) => prev.filter((event) => event.id !== id));
        setSnack({
          open: true,
          message: "Ticket deleted successfully!",
          type: "success",
        });
      })
      .catch((err) => {
        setSnack({
          open: true,
          message: "Ticket deleted failed!",
          type: "error",
        });
      });
  };

  const notFound = !dataFiltered.length && !!filterName;

  const handleSave = async () => {
    try {
      if (
        dataFormAdd.name === "" ||
        dataFormAdd.price === null ||
        dataFormAdd.quantity === null ||
        dataFormAdd.startDate === "" ||
        dataFormAdd.endDate === "" ||
        dataFormAdd.minQuantity === null ||
        dataFormAdd.maxQuantity === null
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
      if (moment(dataFormAdd.startDate).isBefore(moment(new Date()), "day")) {
        setSnack({
          open: true,
          message: "Start date must be greater or today!",
          type: "error",
        });
        return;
      }
      if (moment(dataFormAdd.endDate).isBefore(moment(new Date()), "day")) {
        setSnack({
          open: true,
          message: "End date must be greater than today!",
          type: "error",
        });
        return;
      }
      if (dataFormAdd.startDate.isAfter(dataFormAdd.endDate)) {
        setSnack({
          open: true,
          message: "End date must be greater than start date!",
          type: "error",
        });
        return;
      }

      const response = await axiosPrivate.post(
        UrlConfig.ticketType.createTicketType,
        {
          name: dataFormAdd.name,
          price: dataFormAdd.price,
          quantity: dataFormAdd.quantity,
          startDate: dataFormAdd.startDate,
          endDate: dataFormAdd.endDate,
          minQuantity: dataFormAdd.minQuantity,
          maxQuantity: dataFormAdd.maxQuantity,
          event: dataFormAdd.event,
          salesChannel: dataFormAdd.salesChannel,
          ticketType: dataFormAdd.ticketType,
          tier: dataFormAdd.tier,
        }
      );

      if (response.data.status === "success") {
        setSnack({
          open: true,
          message: "Ticket add successfully!",
          type: "success",
        });
        setopenAdd(false);
        reloadWhenUpdated();
        //after success, render the updated data
      } else {
        setSnack({
          open: true,
          message: error.response.data.message || "Something went wrong!",
          type: "error",
        });
      }
    } catch (error) {
      //catch error
      setSnack({
        open: true,
        message: error.response.data.message || "Something went wrong!",
        type: "error",
      });
    }
  };

  const getALlTiers = async () => {
    try {
      const response = await axiosPrivate.get(
        UrlConfig.event.getTiersByEventId(eventId)
      );

      if (response.data.status === "success") {
        setTiers(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function handleSaveTicketing(status) {
    try {
      if (events.length === 0) {
        setSnack({
          open: true,
          message: "Please create at least one ticket!",
          type: "error",
        });
        return;
      }
      const res = await axiosPrivate.put(UrlConfig.event.updateEvent(eventId), {
        status: status,
      });
      if (res.data.status === "success") {
        setSnack({
          open: true,
          message: "Ticketing saved successfully!",
          type: "success",
        });
        router.push(`/manage/event/${eventId}/publish`);
      } else {
        setSnack({
          open: true,
          message: error.response.data.message || "Something went wrong!",
          type: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchDetailEvent = async () => {
    const response = await axiosPrivate.get(UrlConfig.event.getEvent(eventId));
    if (response.data.status === "success") {
      const event = response.data.data.data;
      setEventDetail(event);
    }
  };

  useEffect(() => {
    axiosPrivate
      .get(UrlConfig?.ticketType.getTicketTypesByEventId(eventId))
      .then((res) => {
        const events = res.data.data.map((event) => {
          return {
            ...event,

            id: event._id,
          };
        });
        setEvents(events);
      });

    getALlTiers();
    fetchDetailEvent();

    return () => {
      setdataFormAdd({
        name: "",
        price: "",
        quantity: "",
        event: eventId,
        startDate: dayjs(new Date()),
        endDate: dayjs(new Date()).add(1, "day"),
        minQuantity: 1,
        maxQuantity: 10,
        ticketType: "free",
        salesChannel: "both", // Default value
        tier: null,
      });
    };
  }, [isUpdated]);

  useEffect(() => {
    const saveTicketing = async () => {
      if (events.length === 0) {
        const res = await axiosPrivate.put(
          UrlConfig.event.updateEvent(eventId),
          {
            status: "building",
          }
        );
      }
    };

    saveTicketing();
  }, [events]);

  const reloadWhenUpdated = () => {
    setIsUpdated(!isUpdated);
  };

  return (
    <Box sx={{ px: 5 }}>
      <CustomSnackbar />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h3">TICKETS</Typography>{" "}
        {/* Replace "/new-event-page" with the actual link */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => router.push(`/seats?eventId=${eventId}`)}
          >
            Edit Venue Map
          </Button>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setopenAdd(true)}
          >
            New Ticket
          </Button>
        </Stack>
      </Stack>
      <Card>
        <TicketTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          filterStatus={filterStatus}
          onFilterStatus={handleFilterStatus}
        />

        <TableContainer sx={{ overflow: "unset" }}>
          <Table sx={{ minWidth: 800 }}>
            <TicketTableHead
              order={order}
              orderBy={orderBy}
              rowCount={events.length}
              numSelected={selected.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
              headLabel={
                eventDetail?.reservedSeating
                  ? [
                      { id: "name", label: "Name" },
                      { id: "date", label: "Date" },
                      { id: "price", label: "Price" },
                      { id: "sellingPrice", label: "Selling Price" },

                      { id: "sold", label: "Sold" },
                      { id: "tier", label: "Tier" },
                      { id: "status", label: "Status" },
                    ]
                  : [
                      { id: "name", label: "Name" },
                      { id: "date", label: "Date" },
                      { id: "price", label: "Price" },
                      { id: "sellingPrice", label: "Selling Price" },
                      { id: "sold", label: "Sold" },
                      { id: "status", label: "Status" },
                    ]
              }
            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TicketTableRow
                    key={row.id}
                    ticket={row}
                    selected={selected.indexOf(row.id) !== -1}
                    handleClick={(event) => handleClick(event, row.id)}
                    handleDeleteEvent={(event) => handleDeleteEvent(row.id)}
                    eventId={eventId}
                    reloadWhenUpdated={reloadWhenUpdated}
                    tiers={tiers}
                    setTiers={setTiers}
                    isReservedSeating={eventDetail?.reservedSeating}
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

        <TablePagination
          page={page}
          component="div"
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          color="primary"
          disable={events.length === 0}
          sx={{
            marginTop: "20px",
          }}
          onClick={() => {
            handleSaveTicketing("ticketing");
          }}
          disabled={events.length === 0}
        >
          Next
        </Button>
      </Box>
      <Modal open={openAdd} onClose={() => setopenAdd(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            //   width: isMobile ? '80vw' : width ? width : '100vw',
            width: isMobile ? "80%" : "40%",
            height: isMobile ? "80%" : "85%",
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
              setopenAdd(false);
            }}
            dataForm={dataFormAdd}
            setDataForm={setdataFormAdd}
            handleSave={handleSave}
            tiers={tiers}
            setTiers={setTiers}
          />
        </Box>
      </Modal>
    </Box>
  );
}

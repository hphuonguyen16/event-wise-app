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
import CreateTicket from "./components/create-promo";
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
  const [selectedTicketType, setSelectedTicketType] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [dataFormAdd, setdataFormAdd] = useState({
    name: "",
    discount: "",
    discountType: "",
    startDate: null,
    endDate: null,
    // discountAmount: "",
    // discountPercentage: "",
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
      .delete(UrlConfig?.promo.deletePromo(id))
      .then((res) => {
        setEvents((prev) => prev.filter((event) => event.id !== id));
        setSnack({
          open: true,
          message: "Promo deleted successfully!",
          type: "success",
        });
      })
      .catch((err) => {
        setSnack({
          open: true,
          message: "Promo deleted failed!",
          type: "error",
        });
      });
  };

  const notFound = !dataFiltered.length && !!filterName;

  const handleSave = async () => {
    try {
      if (
        !dataFormAdd.name ||
        !dataFormAdd.discount ||
        !dataFormAdd.startDate ||
        !dataFormAdd.endDate ||
        !dataFormAdd.discountType
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

      const response = await axiosPrivate.post(UrlConfig.promo.createPromo, {
        ...dataFormAdd,
        event: eventId,
        applyTo: selectedTicketType.map((ticketType) => ticketType._id),
      });

      if (response.data.status === "success") {
        setSnack({
          open: true,
          message: "Promo add successfully!",
          type: "success",
        });
        setopenAdd(false);
        reloadWhenUpdated();
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

  async function getTicketTypes() {
    try {
      const response = await axiosPrivate.get(
        UrlConfig.ticketType.getTicketTypesByEventId(eventId)
      );
      setTicketTypes(response.data.data);
    } catch (error) {
      setSnack({
        open: true,
        message: error.response.data.message || "Something went wrong!",
        type: "error",
      });
    }
  }

  useEffect(() => {
    axiosPrivate
      .get(UrlConfig?.event.getPromosByEventId(eventId))
      .then((res) => {
        const events = res.data.data.map((event) => {
          return {
            ...event,

            id: event._id,
          };
        });
        setEvents(events);
      })
      .catch((err) => {
        console.log(err);
      });
    getTicketTypes();
    return () => {
      setdataFormAdd({
        name: "",
        discount: "",
        discountType: "",
        // applyTo: [],
        startDate: null,
        endDate: null,
      });
      setSelectedTicketType([]);
    };
  }, [isUpdated]);

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
        <Typography variant="h3">Promos</Typography>{" "}
        {/* Replace "/new-event-page" with the actual link */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setopenAdd(true)}
          >
            New Promo
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
              headLabel={[
                { id: "name", label: "Name" },
                { id: "date", label: "Date" },
                { id: "discount", label: "Discount" },
                { id: "apply", label: "Apply To" },
                { id: "status", label: "Status" },
              ]}
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
                    isReservedSeating={eventDetail?.reservedSeating}
                    ticketTypes={ticketTypes}
                    setTicketTypes={setTicketTypes}
                    selectedTicketType={selectedTicketType}
                    setSelectedTicketType={setSelectedTicketType}
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
      <Modal open={openAdd} onClose={() => setopenAdd(false)}>
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
              setopenAdd(false);
            }}
            dataForm={dataFormAdd}
            setDataForm={setdataFormAdd}
            handleSave={handleSave}
            ticketTypes={ticketTypes}
            setTicketTypes={setTicketTypes}
            selectedTicketType={selectedTicketType}
            setSelectedTicketType={setSelectedTicketType}
          />
        </Box>
      </Modal>
    </Box>
  );
}

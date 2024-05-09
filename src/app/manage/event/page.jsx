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
import EventTableRow from "./components/event-table-row";
import EventTableHead from "./components/event-table-head";
import TableEmptyRows from "./components/table-empty-rows";
import EventTableToolbar from "./components/event-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "./components/utils";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import UrlConfig from "@/config/urlConfig";
import useSnackbar from "@/context/snackbarContext";
import CustomSnackbar from "@/components/common/Snackbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatOnlyDate, formatTime } from "@/utils/DateConvert";

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [events, setEvents] = useState([]);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();
  const { setSnack } = useSnackbar();

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
      .delete(UrlConfig?.event.deleteEvent(id))
      .then((res) => {
        setEvents((prev) => prev.filter((event) => event.id !== id));
        setSnack({
          open: true,
          message: "Event deleted successfully!",
          type: "success",
        });
      })
      .catch((err) => {
        setSnack({
          open: true,
          message: "Event deleted failed!",
          type: "error",
        });
      });
  };

  function handleClickRow(id) {
    router.push(`/manage/event/${id}`);
  }

  const notFound = !dataFiltered.length && !!filterName;

  useEffect(() => {
    const url = UrlConfig?.event.getMyEvents;
    console.log(url);
    axiosPrivate.get(UrlConfig?.event.getMyEvents).then((res) => {
      const events = res.data.data.map((event) => {
        return {
          id: event._id,
          title: event.title,
          location: event.location.formatted,
          detailLocation: event.detailLocation,
          date:
            formatOnlyDate(event.date) +
            (event.startTime ? ` at ${formatTime(event.startTime)}` : "") +
            (event.endTime ? ` - ${formatTime(event.endTime)}` : ""),
          status: event.status,
          image: event.images ? event.images[0] : "",
        };
      });
      setEvents(events);
    });
  }, []);

  console.log(events);

  return (
    <Box sx={{ px: 5 }}>
      <CustomSnackbar />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h3">Events</Typography>

        <Link href="/manage/event/create">
          {" "}
          {/* Replace "/new-event-page" with the actual link */}
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Event
          </Button>
        </Link>
      </Stack>

      <Card>
        <EventTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          filterStatus={filterStatus}
          onFilterStatus={handleFilterStatus}
        />

        <TableContainer sx={{ overflow: "unset" }}>
          <Table sx={{ minWidth: 800 }}>
            <EventTableHead
              order={order}
              orderBy={orderBy}
              rowCount={events.length}
              numSelected={selected.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[
                { id: "title", label: "Title" },
                { id: "location", label: "Location" },
                { id: "date", label: "Date" },
                { id: "status", label: "Status" },
              ]}
            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <EventTableRow
                    key={row.id}
                    title={row.title}
                    location={row.location}
                    date={row.date}
                    status={row.status}
                    detailLocation={row.detailLocation}
                    image={row.image}
                    selected={selected.indexOf(row.id) !== -1}
                    handleClick={(event) => handleClick(event, row.id)}
                    handleClickRow = {() => handleClickRow(row.id)}
                    handleDeleteEvent={(event) => handleDeleteEvent(row.id)}
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
    </Box>
  );
}

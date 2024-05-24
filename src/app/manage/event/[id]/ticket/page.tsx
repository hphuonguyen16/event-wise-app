"use client";

//@ts-nocheck

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
import Modal from "@mui/material/Modal";
import CreateTicket from "./components/create-ticket";
import useResponsive from "@/hooks/useResponsive";
import dayjs from "dayjs";
import moment from "moment";
import { useRouter } from "next/navigation";

// ----------------------------------------------------------------------
export default function UserPage({ params }: any) {
  const eventId = params.id;
  const router = useRouter();
  const isMobile = useResponsive("down", "sm");
  const [openAdd, setOpenAdd] = useState(false);
  const [page, setPage] = useState(0);

  const [events, setEvents] = useState<any[]>([]);

  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const [selected, setSelected] = useState<string[]>([]);

  const [orderBy, setOrderBy] = useState<string>("name");

  const [filterName, setFilterName] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isUpdated, setIsUpdated] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { setSnack } = useSnackbar();
  const [dataFormAdd, setDataFormAdd] = useState<any>({
    name: "",
    price: 0,
    quantity: 0,
    event: eventId,
    startDate: dayjs(new Date()),
    endDate: dayjs(new Date()).add(1, "day"),
    minQuantity: 1,
    maxQuantity: 10,
    salesChannel: "both", // Default value
    ticketType: "free",
  });

  const handleSort = (event: any, id: string) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = events.map((n: any) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
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

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event: any) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterStatus = (event: any) => {
    setPage(0);
    setFilterStatus(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: events,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
  });

  const handleDeleteEvent = (id: string) => {
    axiosPrivate
      .delete(UrlConfig?.ticketType.deleteTicketType(id))
      .then((res: any) => {
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
          message: "Ticket deletion failed!",
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

      // validate start date and end date using isBefore
      // compare with now
      if (moment(dataFormAdd.startDate).isBefore(moment(new Date()), "day")) {
        setSnack({
          open: true,
          message: "Start date must be today or later!",
          type: "error",
        });
        return;
      }
      if (moment(dataFormAdd.endDate).isBefore(moment(new Date()), "day")) {
        setSnack({
          open: true,
          message: "End date must be today or later!",
          type: "error",
        });
        return;
      }
      if (dataFormAdd.startDate.isAfter(dataFormAdd.endDate)) {
        setSnack({
          open: true,
          message: "End date must be after start date!",
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
        }
      );

      if (response.data.status === "success") {
        setSnack({
          open: true,
          message: "Ticket added successfully!",
          type: "success",
        });
        setOpenAdd(false);
        reloadWhenUpdated();
      } else {
        setSnack({
          open: true,
          message: response.data.message || "Something went wrong!",
          type: "error",
        });
      }
    } catch (error: any) {
      setSnack({
        open: true,
        message: error.response?.data?.message || "Something went wrong!",
        type: "error",
      });
    }
  };

  async function handleSaveTicketing(status: string) {
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
          message: res.data.message || "Something went wrong!",
          type: "error",
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    axiosPrivate
      .get(UrlConfig?.ticketType.getTicketTypesByEventId(eventId))
      .then((res: any) => {
        const events = res.data.data.map((event: any) => {
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
            minQuantity: event.minQuantity,
            maxQuantity: event.maxQuantity,
          };
        });
        setEvents(events);
      });
  }, [isUpdated]);

  const reloadWhenUpdated = () => {
    setIsUpdated(!isUpdated);
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Ticketing
        </Typography>
        <Button
          variant="contained"
          //@ts-ignore
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setOpenAdd(true)}
        >
          Create Ticket
        </Button>
      </Stack>

      <Card>
        <TicketTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
          filterStatus={filterStatus}
          onFilterStatus={handleFilterStatus}
        />

        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TicketTableHead
              order={order}
              orderBy={orderBy}
              headLabel={[
                { id: "name", label: "Ticket Name", alignRight: false },
                { id: "price", label: "Price", alignRight: false },
                { id: "quantity", label: "Quantity", alignRight: false },
                { id: "status", label: "Status", alignRight: false },
                { id: "startTime", label: "Start Time", alignRight: false },
                { id: "endTime", label: "End Time", alignRight: false },
                { id: "" },
              ]}
              rowCount={events.length}
              numSelected={selected.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => (
                  <TicketTableRow
                    key={row.id}
                    //@ts-ignore
                    row={row}
                    selected={selected.includes(row.id)}
                    onSelectRow={(event: any) => handleClick(event, row.id)}
                    onDeleteRow={() => handleDeleteEvent(row.id)}
                  />
                ))}

              <TableEmptyRows
                height={72}
                emptyRows={emptyRows(page, rowsPerPage, events.length)}
              />

                {/*@ts-ignore */ }
              <TableNoData isNotFound={notFound} />
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ position: "relative" }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={events.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Card>

      <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
        <Button
          variant="contained"
          onClick={() => handleSaveTicketing("DRAFT")}
        >
          Save as Draft
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSaveTicketing("PUBLISHED")}
        >
          Publish
        </Button>
      </Box>

      <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
        <CreateTicket
          /*@ts-ignore */
          onCancel={() => setOpenAdd(false)}
          dataFormAdd={dataFormAdd}
          setDataFormAdd={setDataFormAdd}
          onSave={handleSave}
        />
      </Modal>

      <CustomSnackbar />
    </>
  );
}

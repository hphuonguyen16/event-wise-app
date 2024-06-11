"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import UrlConfig from "@/config/urlConfig";
import { useEffect } from "react";
import moment from "moment";
import Iconify from "@/components/iconify";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import TicketTableToolbar from "./order-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "./utils";
import { useState } from "react";
import dayjs from "dayjs";
import TablePagination from "@mui/material/TablePagination";
import Card from "@mui/material/Card";
import CustomSnackbar from "@/components/common/Snackbar";
import useSnackbar from "@/context/snackbarContext";
import Rootmodal from "@/components/common/modals/RootModal";
import { useAuth } from "@/context/AuthContext";

function Row(props) {
  const { row, handleDeleteOrder, reloadDataFn } = props;
  const [open, setOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(null);
  const axiosPrivate = useAxiosPrivate();
  const [openRefund, setOpenRefund] = useState(false);
  const { user } = useAuth();
  const { setSnack } = useSnackbar();

  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };
  async function handleRefund(orderId) {
    try {
      const res = await axiosPrivate.put(UrlConfig.order.refund(orderId), {
        _id: orderId,
        organizer: user._id,
      });
      if (res?.data?.status === "success") {
        reloadDataFn();
        setOpenRefund(false);
        setSnack({
          open: true,
          message: "Ticket has been refunded successfully",
          type: "success",
        });
      }
    } catch (error) {
      setSnack({
        open: true,
        message:
          error?.response?.data?.message ||
          "Something went wrong! Please try later.",
        type: "error",
      });
    }
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row._id}
        </TableCell>
        <TableCell align="left">
          {/* {row.user.firstname + " " + row.user.lastname} */}
          {row.user
            ? row?.user?.profile?.name
            : row.contactInfo
            ? row.contactInfo.firstName + " " + row.contactInfo.lastName
            : ""}
        </TableCell>
        <TableCell align="right">
          {moment(row.registrationDate).format("MM-DD-YYYY HH:mm")}
        </TableCell>
        <TableCell align="right">{row.orderType}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">{row.totalPrice}</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order detail
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Tickets</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell align="left">Amount</TableCell>
                    <TableCell align="right">Total price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orders.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row" align="left">
                        {historyRow.ticketType.name}
                      </TableCell>
                      <TableCell component="th" scope="row" align="left">
                        {historyRow.price
                          ? historyRow.price.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })
                          : "N/A"}
                      </TableCell>
                      <TableCell>{historyRow.quantity}</TableCell>
                      <TableCell align="right">
                        {historyRow.price
                          ? (
                              historyRow.price * historyRow.quantity
                            ).toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
        <Popover
          open={!!openMenu}
          anchorEl={openMenu}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: { width: 140 },
          }}
        >
          <MenuItem>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Edit
          </MenuItem>

          <MenuItem sx={{ color: "error.main" }} onClick={handleDeleteOrder}>
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Delete
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpenRefund(true);
            }}
          >
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Refund
          </MenuItem>
        </Popover>
      </TableRow>
      <Rootmodal
        variant="Info"
        title={"Refund Order"}
        open={openRefund}
        handleClose={() => setOpenRefund(false)}
        handleOk={() => handleRefund(row._id)}
        width={700}
        height={250}
      >
        Are you sure you want to refund this order? This action cannot be undone
        and will initiate the refund process for the customer.
      </Rootmodal>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [orderData, setOrderData] = React.useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [openRefund, setOpenRefund] = useState(false);

  console.log("orderData", orderData);

  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filterName, setFilterName] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");

  const [reloadData, setReloadData] = useState(false);

  const [filterData, setFilterData] = useState({
    name: "",
    startDate: null,
    endDate: null,
    orderType: "",
    status: "",
  });

  const { setSnack } = useSnackbar();

  async function fetchOrderData() {
    const response = await axiosPrivate.get(UrlConfig.order.getAllOrders);
    if (response.data.status === "success") {
      const orders = response.data.data;
      setOrderData(orders);
    }
  }

  function handleDeleteOrder(_id) {
    axiosPrivate
      .delete(UrlConfig?.order?.deleteOrder(_id))
      .then((res) => {
        setOrderData(orderData.filter((order) => order._id !== _id));
        setSnack({
          open: true,
          message: "Order deleted successfully!",
          type: "success",
        });
      })
      .catch((err) => {
        setSnack({
          open: true,
          message:
            err?.response?.data?.message ||
            "Order delete failed! Please try again later!",
          type: "error",
        });
      });
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orderData.map((n) => n._id);
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

  function reloadDataFn() {
    setReloadData(!reloadData);
  }

  const dataFiltered = applyFilter({
    inputData: orderData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
    filterData,
  });

  useEffect(() => {
    const fetchData = async () => {
      await fetchOrderData();
    };
    fetchData();
  }, [reloadData]);

  return (
    <Card>
      <CustomSnackbar />
      <TableContainer component={Paper}>
        <TicketTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          filterStatus={filterStatus}
          onFilterStatus={handleFilterStatus}
          filterData={filterData}
          setFilterData={setFilterData}
        />
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Order Id</TableCell>
              <TableCell align="left">Attendee</TableCell>
              <TableCell align="right">Purchased date</TableCell>
              <TableCell align="right">Order type</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataFiltered
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                // @ts-ignore
                <Row
                  key={row._id}
                  row={row}
                  handleDeleteOrder={(event) => handleDeleteOrder(row._id)}
                  reloadDataFn={(event) => reloadDataFn()}
                />
              ))}
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
  );
}

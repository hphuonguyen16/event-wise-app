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
import UserTableRow from "./components/user-table-row";
import UserTableHead from "./components/user-table-head";
import TableEmptyRows from "./components/table-empty-rows";
import UserTableToolbar from "./components/user-table-toolbar";
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

  const [users, setUsers] = useState([]);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();
  const { setSnack } = useSnackbar();

  const handleSort = (user, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (user) => {
    if (user.target.checked) {
      const newSelecteds = users.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (user, name) => {
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

  const handleChangePage = (user, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (user) => {
    setPage(0);
    setRowsPerPage(parseInt(user.target.value, 10));
  };

  const handleFilterByName = (user) => {
    setPage(0);
    setFilterName(user.target.value);
  };

  const handleFilterStatus = (user) => {
    setPage(0);
    setFilterStatus(user.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
  });
  const handleDeleteUser = (id) => {
    axiosPrivate
      .delete(UrlConfig?.user.deleteUser(id))
      .then((res) => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
        setSnack({
          open: true,
          message: "User deleted successfully!",
          type: "success",
        });
      })
      .catch((err) => {
        setSnack({
          open: true,
          message: "User deleted failed!",
          type: "error",
        });
      });
  };

  function handleClickRow(id) {
    router.push(`/manage/user/${id}`);
  }

  const notFound = !dataFiltered.length && !!filterName;

  useEffect(() => {
    axiosPrivate.get(UrlConfig?.user.getAllUsers).then((res) => {
      const users = res.data.data.data.map((user) => {
        return {
          id: user._id,
          email: user.email,
          role: user.role,
          isActived: user.isActived,
          verify: user.verify,
          approved: user.approved,
          balance: user.balance,
          createdAt: user.createdAt,
          profile: user.profile,
        };
      });
      setUsers(users);
    });
  }, []);

  return (
    <Box sx={{ px: 5 }}>
      <CustomSnackbar />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h3">Users</Typography>

        <Link href="/manage/user/create">
          {" "}
          {/* Replace "/new-user-page" with the actual link */}
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New User
          </Button>
        </Link>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          filterStatus={filterStatus}
          onFilterStatus={handleFilterStatus}
        />

        <TableContainer sx={{ overflow: "unset" }}>
          <Table sx={{ minWidth: 800 }}>
            <UserTableHead
              order={order}
              orderBy={orderBy}
              rowCount={users.length}
              numSelected={selected.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[
                { id: "email", label: "Email" },
                { id: "name", label: "Name" },
                { id: "role", label: "Role" },
                { id: "isActived", label: "Active" },
                { id: "verify", label: "Verify" },
                { id: "approved", label: "Approved" },
                { id: "balance", label: "Balance" },
                { id: "createdAt", label: "Created At" },
              ]}
            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <UserTableRow
                    key={row.id}
                    email={row.email}
                    role={row.role}
                    isActived={row.isActived}
                    verify={row.verify}
                    approved={row.approved}
                    balance={row.balance}
                    createdAt={formatOnlyDate(row.createdAt)}
                    profile={row.profile}
                    selected={selected.indexOf(row.id) !== -1}
                    handleClick={(user) => handleClick(user, row.id)}
                    handleClickRow={() => handleClickRow(row.id)}
                    handleDeleteUser={(user) => handleDeleteUser(row.id)}
                  />
                ))}

              <TableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, users.length)}
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

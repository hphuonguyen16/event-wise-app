"use client";
import React from "react";
import { useEffect, useState } from "react";
import WithdrawHistoryTable from "./WithdrawHistoryTable";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import CustomSnackbar from "@/components/common/Snackbar";
import useSnackbar from "@/context/snackbarContext";
import UrlConfig from "@/config/urlConfig";
import { Stack, TablePagination, Typography } from "@mui/material";
import TicketTableToolbar from "./order-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "./utils";

// @mui
import { Box, Pagination } from "@mui/material";

const TransactionManagement = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const axiosPrivate = useAxiosPrivate();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [transactionData, setTransactionData] = useState([]);
  const [filterData, setFilterData] = useState({
    startDate: null,
    endDate: null,
    status: "",
    name: "",
  });

  const fetchTransactionData = async () => {
    const res = await axiosPrivate.get(
      UrlConfig.withdrawal.getAllWithdrawalRequests
    );
    setTransactionData(res.data.data);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const dataFiltered = applyFilter({
    inputData: transactionData,
    comparator: getComparator(order, orderBy),
    filterData,
  });

  useEffect(() => {
    const fetchData = async () => {
      await fetchTransactionData();
    };
    fetchData();
  }, []);
  return (
    <Box sx={{ px: 5 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h3">Withdraw</Typography>
      </Stack>

      <TicketTableToolbar
        filterData={filterData}
        setFilterData={setFilterData}
      />
      <WithdrawHistoryTable
        request={dataFiltered.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )}
        fetchTransactionData={fetchTransactionData}
      />
      <Box>
        <TablePagination
          page={page}
          component="div"
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default TransactionManagement;

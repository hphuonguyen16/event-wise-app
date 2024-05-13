"use client";
import React from "react";
import { useEffect, useState } from "react";
import WithdrawHistoryTable from "./WithdrawHistoryTable";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import CustomSnackbar from "@/components/common/Snackbar";
import useSnackbar from "@/context/snackbarContext";
import UrlConfig from "@/config/urlConfig";
import { TablePagination } from "@mui/material";
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
    transaction_type: "",
    name : "",
  });

  const fetchTransactionData = async () => {
    const res = await axiosPrivate.get(
      UrlConfig.transaction.getAllTransactions
    );
    setTransactionData(res.data.data);
  };

  console.log(transactionData);

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
    <div
      style={{
        width: "100%",
        padding: "20px 100px",
        maxHeight: "93vh",
        overflow: "auto",
      }}
    >
      <TicketTableToolbar
        filterData={filterData}
        setFilterData={setFilterData}
      />
      <WithdrawHistoryTable
        request={dataFiltered.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )}
      />
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
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
    </div>
  );
};

export default TransactionManagement;

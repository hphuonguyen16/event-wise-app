"use client";
import React from "react";
import { useEffect, useState } from "react";
import WithdrawHistoryTable from "./WithdrawHistoryTable";
// @mui
import { Box, Pagination } from "@mui/material";

const TransactionManagement = () => {
  const [pageCount, setPageCount] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [request, setRequest] = useState([]);
  const fetchData = async () => {
    // fetch data
  };
  useEffect(() => {
    fetchData();
  }, [pageCount]);
  return (
    <div
      style={{
        width: "100%",
        padding: "20px 100px",
        maxHeight: "93vh",
        overflow: "auto",
      }}
    >
      <WithdrawHistoryTable request={request} fetchData={fetchData} />
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Pagination
          count={totalPages}
          color="primary"
          page={pageCount}
          onChange={(e, value) => setPageCount(value)}
          sx={{
            p: 2,
            mb: 0,
          }}
        />
      </Box>
    </div>
  );
};

export default TransactionManagement;

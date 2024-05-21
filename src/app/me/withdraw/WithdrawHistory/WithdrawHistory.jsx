import { useEffect, useState } from "react";
import WithdrawHistoryTable from "./WithdrawHistoryTable";
// @mui
import { Box, Pagination } from "@mui/material";

export default function WithdrawHistory() {
  const isMobile = false;
  const [pageCount, setPageCount] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [request, setRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    // fetch data
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
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
            mb: isMobile ? 3 : 0,
          }}
        />
      </Box>
    </div>
  );
}

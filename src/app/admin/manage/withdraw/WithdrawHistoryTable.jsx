import moment from "moment";
import {
  Divider,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  CardHeader,
  Stack,
  Avatar,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import WithdrawDetail from "./WithdrawDetail";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useSnackbar from "@/context/snackbarContext";
import CustomSnackbar from "@/components/common/Snackbar";
import UrlConfig from "@/config/urlConfig";

const WithdrawHistoryTable = ({ request, fetchTransactionData }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const { setSnack } = useSnackbar();
  const handleDeny = async (id) => {
    try {
      const res = await axiosPrivate.post(
        UrlConfig.withdrawal.cancelWithdrawalRequest(id)
      );
      if (res.data.status === "success") {
        setSnack({
          open: true,
          message: "The withdraw request has been denied successfully",
          type: "success",
        });
        await fetchTransactionData();
      }
    } catch (error) {
      setSnack({
        open: true,
        message:
          error.response.data.message || "The withdraw request has been failed",
        type: "error",
      });
    }
  };
  const handleConfirm = async (id) => {
    try {
      const res = await axiosPrivate.post(
        UrlConfig.withdrawal.fulfillWithdrawalRequest(id)
      );
      if (res.data.status === "success") {
        setSnack({
          open: true,
          message: "The withdraw request has been confirmed successfully",
          type: "success",
        });
        await fetchTransactionData();
      }
    } catch (error) {
      setSnack({
        open: true,
        message:
          error.response.data.message || "The withdraw request has been failed",
        type: "error",
      });
    }
  };
  console.log(item);
  return (
    <>
      <CustomSnackbar />
      <Card>
        {open && item && (
          <WithdrawDetail open={open} setOpen={setOpen} withdraw={item} />
        )}
        <CardHeader title="Yeu cau" />
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>From</TableCell>
                <TableCell>Time</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {request.map((cryptoOrder) => {
                return (
                  <TableRow hover key={cryptoOrder.id}>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar src={cryptoOrder.user.avatar} />
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {request.user?.profile.name}{" "}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.secondary"
                        noWrap
                      >
                        {moment(cryptoOrder.transaction.date).format(
                          "DD/MM/YYYY"
                        )}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        noWrap
                      >
                        {moment(cryptoOrder.transaction.date).format(
                          "h:mm:ss A"
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {cryptoOrder.transaction.amount.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {cryptoOrder.transaction.status}
                    </TableCell>
                    <TableCell align="right">
                      {cryptoOrder.transaction.status === "processing" && (
                        <>
                          <Tooltip title={"deny"} arrow>
                            <IconButton
                              sx={{
                                "&:hover": {
                                  background: theme.palette.error.light,
                                },
                                color: theme.palette.error.main,
                              }}
                              color="inherit"
                              size="small"
                              onClick={() => {
                                handleDeny(cryptoOrder._id);
                              }}
                            >
                              <CancelTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={"confirm"} arrow>
                            <IconButton
                              sx={{
                                "&:hover": {
                                  background: theme.palette.success.lighter,
                                },
                                color: theme.palette.success.main,
                              }}
                              color="inherit"
                              size="small"
                              onClick={() => {
                                handleConfirm(cryptoOrder._id);
                              }}
                            >
                              <CheckCircleTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                      <Tooltip title={"detail"} arrow>
                        <IconButton
                          sx={{
                            "&:hover": {
                              background: theme.palette.primary.light,
                            },
                            color: theme.palette.primary.main,
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpen(true);
                            setItem(cryptoOrder);
                          }}
                        >
                          <VisibilityTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default WithdrawHistoryTable;

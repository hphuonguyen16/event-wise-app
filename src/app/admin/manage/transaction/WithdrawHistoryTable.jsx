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
import DetailTransaction from "./DetailTransaction";

const WithdrawHistoryTable = ({ request }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = useState({});
  const handleDeny = async (id) => {
    // call api
  };
  const handleConfirm = async (id) => {
    // call api
  };
  return (
    <>
      <Card>
        {open && (
          <DetailTransaction open={open} setOpen={setOpen} transaction={item} />
        )}
        <CardHeader title="Yeu cau" />
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Transaction date</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Type</TableCell>
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
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar src={cryptoOrder.user?.profile.avatar} />
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {request.organizer
                            ? request.organizer?.profile.name
                            : "Me"}
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
                        {moment(cryptoOrder.date).format("DD/MM/YYYY")}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        noWrap
                      >
                        {moment(cryptoOrder.date).format("h:mm:ss A")}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {cryptoOrder.amount.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {cryptoOrder.transaction_type}
                    </TableCell>
                    <TableCell align="right">{cryptoOrder.status}</TableCell>
                    <TableCell align="right">
                      {/* {cryptoOrder.status === "processing" && (
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
                      )} */}
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

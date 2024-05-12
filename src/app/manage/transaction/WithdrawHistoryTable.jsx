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

const WithdrawHistoryTable = ({ request, fetchData }) => {
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
        <CardHeader title="Yeu cau" />
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell align="right">So luong</TableCell>
                <TableCell align="right">trang thai</TableCell>
                <TableCell align="right">hanh dong</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {request.map((cryptoOrder) => {
                return (
                  <TableRow hover key={cryptoOrder.id}>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar src={cryptoOrder.user.photo_url} />
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {cryptoOrder.user.first_name}{" "}
                          {cryptoOrder.user.last_name}
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
                        {moment(cryptoOrder.transaction.updatedAt).format(
                          "DD/MM/YYYY"
                        )}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        noWrap
                      >
                        {moment(cryptoOrder.transaction.updatedAt).format(
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
                      {getStatusLabel(
                        cryptoOrder.transaction.transaction_status
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {cryptoOrder.transaction.transaction_status ===
                        "PROCESSING" && (
                        <>
                          <Tooltip title={t("deny")} arrow>
                            <IconButton
                              sx={{
                                "&:hover": {
                                  background: theme.palette.error.lighter,
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
                          <Tooltip title={t("confirm")} arrow>
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
                      <Tooltip title={t("detailInfo")} arrow>
                        <IconButton
                          sx={{
                            "&:hover": {
                              background: theme.palette.primary.lighter,
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
